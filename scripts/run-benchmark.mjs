#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/run-benchmark.mjs <skill> [--reps N] [--concurrency N]
 *
 * Examples:
 *   node scripts/run-benchmark.mjs option
 *   node scripts/run-benchmark.mjs either --reps 5 --concurrency 8
 *
 * For each scenario × model × rep, the runner generates two outputs (baseline, and with
 * SKILL.md injected) and grades each output in a single Haiku call that answers every
 * criterion at once ("<n>: YES|NO" per line). An unparseable answer is retried once; if
 * it fails again those criteria count as 0 and the report shows an [ERROR] note.
 * Independent calls run in parallel, at most --concurrency at a time
 * (default 4). The report is assembled only after all calls finish, so its order matches
 * a sequential run.
 *
 * Every call is an isolated `claude -p` (see CLAUDE_FLAGS): no settings files (so no
 * plugins, hooks or effort overrides), no MCP servers, no skills or slash commands, and
 * no tools, so the model answers in text and the user's environment does not leak in.
 * Authentication still comes from the normal `claude` login.
 *
 * Output: markdown to stdout, progress to stderr. Pipe stdout to a file or append it to the log.
 *   node scripts/run-benchmark.mjs option >> docs/skill-benchmark-runs-log.md
 */

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Args ──────────────────────────────────────────────────────────────────────

const USAGE = 'Usage: node scripts/run-benchmark.mjs <skill> [--reps N] [--concurrency N]';

const args = process.argv.slice(2);
const skill = args[0];

if (!skill || skill.startsWith('--')) {
  console.error(USAGE);
  process.exit(1);
}

function intFlag(name, fallback) {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const value = Number(args[idx + 1]);
  if (!Number.isInteger(value) || value < 1) {
    console.error(`ERROR: ${name} needs a positive integer\n${USAGE}`);
    process.exit(1);
  }
  return value;
}

const REPS = intFlag('--reps', 3);
const CONCURRENCY = intFlag('--concurrency', 4);

const MODELS = [
  'claude-sonnet-5-5',
];

const GRADER_MODEL = 'claude-haiku-5-5';

const CALL_TIMEOUT_MS = 120_000;

// Start `claude -p` without the user's environment:
//   --setting-sources ''      load no user/project/local settings (plugins, hooks, effort, permissions)
//   --strict-mcp-config       no MCP servers, including claude.ai connectors (no --mcp-config is given)
//   --disable-slash-commands  no skills or slash commands in the system prompt
//   --tools ''                no tools: the model answers in text and cannot touch files
//   --append-system-prompt    says so; without it the model writes fake tool calls as text
//   --no-session-persistence  do not write a session transcript for every call
const NO_TOOLS_NOTE =
  'No tools are available in this session. Answer directly in your reply; ' +
  'do not try to call tools, read files or explore a codebase.';
const CLAUDE_FLAGS = [
  '--setting-sources', '',
  '--strict-mcp-config',
  '--disable-slash-commands',
  '--tools', '',
  '--append-system-prompt', NO_TOOLS_NOTE,
  '--no-session-persistence',
];

// ── Load files ────────────────────────────────────────────────────────────────

const skillMdPath = join(ROOT, 'skills', skill, 'SKILL.md');
const evalPath = join(ROOT, 'evals', `${skill}.json`);

let skillContent, evalData;

try {
  skillContent = readFileSync(skillMdPath, 'utf8');
} catch {
  console.error(`ERROR: ${skillMdPath} not found`);
  process.exit(1);
}

try {
  evalData = JSON.parse(readFileSync(evalPath, 'utf8'));
} catch (e) {
  console.error(`ERROR: ${evalPath} not found or invalid JSON — ${e.message}`);
  process.exit(1);
}

// ── Concurrency ───────────────────────────────────────────────────────────────

let active = 0;
const waiting = [];

// Runs fn once fewer than CONCURRENCY limited calls are in flight.
async function limited(fn) {
  if (active >= CONCURRENCY) await new Promise((resolve) => waiting.push(resolve));
  active++;
  try {
    return await fn();
  } finally {
    active--;
    waiting.shift()?.();
  }
}

// ── Claude helpers ────────────────────────────────────────────────────────────

function isError(text) {
  return text.startsWith('[ERROR');
}

// "[ERROR: msg]" -> "msg", on one line so it fits in a markdown list item.
function errorMessage(text) {
  return text.replace(/^\[ERROR:?\s*/, '').replace(/\]$/, '').replace(/\s+/g, ' ').trim();
}

function spawnClaude(prompt, model) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let settled = false;
    const finish = (text) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(text);
    };

    // Same command resolution as the former spawnSync('claude', ...): no shell.
    const child = spawn('claude', ['-p', prompt, '--model', model, ...CLAUDE_FLAGS], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));

    const timer = setTimeout(() => {
      child.kill();
      finish(`[ERROR: timed out after ${CALL_TIMEOUT_MS / 1000}s]`);
    }, CALL_TIMEOUT_MS);

    child.on('error', (err) => finish(`[ERROR: ${err.message}]`));
    child.on('close', (code) => {
      if (code !== 0) finish(`[ERROR: exit ${code} — ${stderr.trim()}]`);
      else finish(stdout.trim());
    });
  });
}

function runClaude(prompt, model) {
  return limited(() => spawnClaude(prompt, model));
}

function graderPrompt(criteria, codeOutput) {
  const n = criteria.length;
  const example = criteria.map((_, i) => `${i + 1}: YES`).join('\n');
  return (
    `You are a strict code evaluator. Judge the code below against each numbered criterion separately, ` +
    `as if it were the only one. A criterion is met only if the code uses exactly the APIs it names ` +
    `and avoids everything it excludes.\n\n` +
    `Criteria:\n${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\n` +
    `Code to evaluate:\n${codeOutput}\n\n` +
    `Does the code satisfy each criterion? Answer with exactly ${n} line${n === 1 ? '' : 's'} and nothing else, ` +
    `one per criterion in order, each in the form "<number>: YES" or "<number>: NO". Example of the format:\n${example}`
  );
}

// Returns one 0/1 verdict per criterion, or null unless every criterion has exactly one verdict.
function parseVerdicts(answer, n) {
  const verdicts = new Array(n).fill(null);
  for (const line of answer.split(/\r?\n/)) {
    const m = line.match(/^[\s*>-]*(\d+)\s*[:.)\]-]?[\s*]*(YES|NO)\b/i);
    if (!m) continue;
    const idx = Number(m[1]) - 1;
    if (idx < 0 || idx >= n || verdicts[idx] !== null) return null;
    verdicts[idx] = /^yes$/i.test(m[2]) ? 1 : 0;
  }
  return verdicts.includes(null) ? null : verdicts;
}

// Grades all criteria in one call, retrying once if the answer can't be parsed.
// Returns { verdicts, error }; on a second failure every verdict is 0 and error says why.
async function grade(criteria, codeOutput) {
  const prompt = graderPrompt(criteria, codeOutput);
  let problem = '';
  for (let attempt = 1; attempt <= 2; attempt++) {
    const answer = await runClaude(prompt, GRADER_MODEL);
    if (isError(answer)) {
      problem = errorMessage(answer);
      continue;
    }
    const verdicts = parseVerdicts(answer, criteria.length);
    if (verdicts) return { verdicts, error: null };
    problem = `unparseable grader answer: ${JSON.stringify(answer.slice(0, 200))}`;
  }
  return { verdicts: new Array(criteria.length).fill(0), error: problem };
}

function fmtPct(n, reps) {
  return `${Math.round((n / reps) * 100)}%`;
}

function fmtDelta(delta) {
  return delta >= 0 ? `+${delta}pp` : `${delta}pp`;
}

function modelShort(model) {
  return model.replace(/-20251001$/, '');
}

function fmtSecs(ms) {
  return `${(ms / 1000).toFixed(1)}s`;
}

// ── Run ───────────────────────────────────────────────────────────────────────

const startedAt = Date.now();
const totalReps = evalData.scenarios.length * MODELS.length * REPS;
let doneReps = 0;

process.stderr.write(
  `${skill}: ${evalData.scenarios.length} scenarios × ${MODELS.length} model(s) × ${REPS} reps, concurrency ${CONCURRENCY}\n`
);

// Generates one output and grades it. Returns { verdicts, errors }.
async function generateAndGrade(scenario, model, prompt, tag) {
  const t0 = Date.now();
  const output = await runClaude(prompt, model);
  if (isError(output)) {
    process.stderr.write(`  ${tag}: generation failed — ${output.slice(0, 200)}\n`);
    return {
      verdicts: new Array(scenario.criteria.length).fill(0),
      errors: [`generation failed, criteria counted as 0: ${errorMessage(output)}`],
    };
  }
  const { verdicts, error } = await grade(scenario.criteria, output);
  const yes = verdicts.reduce((a, b) => a + b, 0);
  process.stderr.write(
    `  ${tag}: ${error ? 'grading FAILED' : `${yes}/${verdicts.length} YES`} (${fmtSecs(Date.now() - t0)})\n`
  );
  return {
    verdicts,
    errors: error ? [`grading failed after retry, criteria counted as 0: ${error}`] : [],
  };
}

async function runRep(scenario, model, r) {
  const label = `[${scenario.id}] ${modelShort(model)} rep ${r + 1}/${REPS}`;
  const skillPrompt =
    `You have access to the following TypeScript library. Use its APIs when writing the code.\n\n` +
    `--- LIBRARY DOCS ---\n${skillContent}\n--- END LIBRARY DOCS ---\n\n` +
    `Task: ${scenario.prompt}`;

  const [baseline, withSkill] = await Promise.all([
    generateAndGrade(scenario, model, scenario.prompt, `${label} baseline`),
    generateAndGrade(scenario, model, skillPrompt, `${label} with skill`),
  ]);

  doneReps++;
  process.stderr.write(`  ${label} done (${doneReps}/${totalReps} reps, ${fmtSecs(Date.now() - startedAt)} elapsed)\n`);

  return {
    baseline,
    withSkill,
    errors: [
      ...baseline.errors.map((e) => `rep ${r + 1} baseline — ${e}`),
      ...withSkill.errors.map((e) => `rep ${r + 1} with skill — ${e}`),
    ],
  };
}

// runs[scenarioId][model] = Promise<rep result[]>, all started up front and bounded by `limited`.
const runs = {};
for (const scenario of evalData.scenarios) {
  runs[scenario.id] = {};
  for (const model of MODELS) {
    runs[scenario.id][model] = Promise.all(
      Array.from({ length: REPS }, (_, r) => runRep(scenario, model, r))
    );
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

const date = new Date().toISOString().split('T')[0];
const out = [];

out.push(`## ${date} — ${skill} benchmark`);
out.push('');
out.push(
  `Method: automated eval via isolated \`claude -p\` (no settings, MCP, skills or tools). ` +
  `Models: ${MODELS.map(modelShort).join(', ')}. Reps: ${REPS}. ` +
  `Grading: one ${modelShort(GRADER_MODEL)} call per output, all criteria at once.`
);
out.push(`Note: "with skill" injects SKILL.md content as library context in the user prompt.`);
out.push('');

// results[scenarioId][criterionIdx][model] = { bPct, sPct, delta }
const results = {};
let errorCount = 0;

for (const scenario of evalData.scenarios) {
  results[scenario.id] = {};

  out.push(`### Scenario: ${scenario.id}${scenario.critical ? ' *(critical)*' : ''}`);
  out.push('');
  out.push(`*${scenario.prompt}*`);
  out.push('');

  for (const model of MODELS) {
    const short = modelShort(model);
    const reps = await runs[scenario.id][model];

    const bCounts = new Array(scenario.criteria.length).fill(0);
    const sCounts = new Array(scenario.criteria.length).fill(0);
    const errors = [];

    for (const rep of reps) {
      for (let c = 0; c < scenario.criteria.length; c++) {
        bCounts[c] += rep.baseline.verdicts[c];
        sCounts[c] += rep.withSkill.verdicts[c];
      }
      errors.push(...rep.errors);
    }

    // Build per-model table
    out.push(`**${short}**`);
    out.push('');
    out.push('| Criterion | Baseline | With skill | Delta |');
    out.push('|-----------|----------|------------|-------|');

    results[scenario.id][model] = [];

    for (let c = 0; c < scenario.criteria.length; c++) {
      const bPct = Math.round((bCounts[c] / REPS) * 100);
      const sPct = Math.round((sCounts[c] / REPS) * 100);
      const delta = sPct - bPct;
      out.push(`| ${scenario.criteria[c]} | ${bPct}% | ${sPct}% | ${fmtDelta(delta)} |`);
      results[scenario.id][model][c] = { bPct, sPct, delta };
    }

    if (errors.length > 0) {
      out.push('');
      errors.forEach((e) => out.push(`- [ERROR] ${e}`));
      errorCount += errors.length;
    }

    out.push('');
  }
}

// ── Release Gate ──────────────────────────────────────────────────────────────

out.push('---');
out.push('');
out.push('## Release Gate');
out.push('');

const issues = [];

if (errorCount > 0) {
  issues.push(
    `**[ERROR]** ${errorCount} output(s) could not be generated or graded; their criteria were counted as 0 (see the scenario notes).`
  );
}

for (const scenario of evalData.scenarios) {
  for (let c = 0; c < scenario.criteria.length; c++) {
    // Universal 0%: skill_pct === 0 on every model in MODELS
    const allZero = MODELS.every(
      (model) => (results[scenario.id][model]?.[c]?.sPct ?? 0) === 0
    );
    if (allZero) {
      issues.push(
        `**BLOCKED** (universal 0%): \`${scenario.id}\` — criterion: *"${scenario.criteria[c]}"*`
      );
    }

    // Critical regression: skill_pct < baseline_pct on any model
    if (scenario.critical) {
      for (const model of MODELS) {
        const r = results[scenario.id][model]?.[c];
        if (r && r.delta < 0) {
          issues.push(
            `**BLOCKED** (regression): \`${scenario.id}\` / ${modelShort(model)} — *"${scenario.criteria[c]}"*: ${r.bPct}% → ${r.sPct}% (${fmtDelta(r.delta)})`
          );
        }
      }
    }
  }
}

if (issues.length === 0) {
  out.push('**READY** — No universal 0% criteria. No critical regressions.');
} else {
  issues.forEach((i) => out.push(`- ${i}`));
  out.push('');
  out.push('**NOT READY**');
}

out.push('');

console.log(out.join('\n'));

process.stderr.write(`Finished in ${fmtSecs(Date.now() - startedAt)}${errorCount ? `, ${errorCount} error(s)` : ''}\n`);
