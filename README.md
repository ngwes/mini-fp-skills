# mini-fp-skills

Claude Code skill plugin for [`@ngwes/mini-fp`](https://www.npmjs.com/package/@ngwes/mini-fp) — a minimal TypeScript functional programming library.

These skills are loaded by coding agents (Claude Code, Copilot, Cursor) when working on projects that use `@ngwes/mini-fp`.

---

## Installation

### Option A: Plugin

This repository is both a plugin and a single-plugin marketplace. In a Claude Code session:

```text
/plugin marketplace add ngwes/mini-fp-skills
/plugin install mini-fp@mini-fp-skills
```

Or from your shell:

```bash
claude plugin marketplace add ngwes/mini-fp-skills
claude plugin install mini-fp@mini-fp-skills
```

Newer Claude Code versions can do both steps at once (2.1.275 or later in a session, 2.1.292 or later in the shell):

```bash
claude plugin install mini-fp --marketplace ngwes/mini-fp-skills
```

New versions reach you when you refresh the marketplace and update the plugin:

```bash
claude plugin marketplace update mini-fp-skills
claude plugin update mini-fp@mini-fp-skills
```

If the repository is private, Claude Code clones it with the git credentials already on your machine (for example after `gh auth setup-git`). Set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` if you have no SSH key for GitHub.

### Option B: Manual copy

```bash
cp -r skills/. ~/.claude/skills/
```

---

## Usage

Add this to the `CLAUDE.md` in your project (the one that uses `@ngwes/mini-fp`):

```markdown
When working with @ngwes/mini-fp, invoke the `mini-fp` skill first.
```

The agent will load the router skill, identify the right type or pattern, and invoke the specific skill automatically.

Installed as a plugin, every skill is namespaced by the plugin name (for example `mini-fp:mini-fp` and `mini-fp:either`). With the manual copy they keep their plain names (`mini-fp`, `either`).

---

## Skill Benchmarking

Each skill is benchmarked and gated with [skill-be](https://ngwes.github.io/skill-be/) (`@ngwes/skill-be`), configured in `skill-be.yaml`. A release is blocked when a skill does not improve model output, or makes it worse.

**Why:** Skills can fail in two ways: they don't trigger (model ignores the context), or they hurt performance (model produces worse output with the skill than without it). Neither failure is visible from reading the skill content alone — you need to run the model and measure.

**How it works:** For each skill, `evals/<skill>.json` defines scenarios with binary criteria. `skill-be run` gives every task to Sonnet (`claude-sonnet-5-5`) twice, alone (baseline) and with the `SKILL.md` content in front of it (with skill), 3 reps each. A Haiku-based judge (`claude-haiku-5-5`) grades each output 3 times against every criterion, and the majority wins. Both models are called through `claude -p`, isolated from your settings, plugins, hooks, MCP servers, skills and tools.

**Release gate** — a skill is NOT READY if:
- Any criterion is 0% with the skill (Sonnet is the only model under test).
- Any criterion of a critical scenario scores lower with the skill than without it.
- Any output could not be generated or graded.

**Checks (no model call):**
- Typecheck: the TypeScript code blocks in each `SKILL.md` are compiled against the installed `@ngwes/mini-fp`. A failure blocks.
- Coverage: lists `@ngwes/mini-fp` exports that no skill or eval mentions. It is reported but does not block.

### Run it locally

You need Node 20 or newer and the `claude` CLI installed and logged in. Leave `ANTHROPIC_API_KEY` unset: `claude` prefers that variable to its login.

```bash
npm install
npm run bench:check          # typecheck + coverage, no model call
npm run bench                # benchmark every skill; can take an hour
npx skill-be run option      # benchmark one skill
npx skill-be triage          # explain why criteria failed in the latest run
npm run bench:verify         # what CI runs; no model call
npm run bench:code           # the code tests only (see below)
```

`skill-be run` writes the outputs and reports under `.skill-be/` (not committed) and records each skill's verdict in `skill-be.result.json`. Commit that file with any change to a `SKILL.md`, an eval file or `skill-be.yaml`. A skill's fingerprint covers its `SKILL.md`, its eval file and `skill-be.yaml`, so editing any of them without running the benchmark again makes `verify` fail (a change to `skill-be.yaml` makes every skill stale).

### In CI

`.github/workflows/verify.yml` runs `npx skill-be verify` on pull requests and on pushes to `main`, and `release.yml` runs the same step in a `verify` job that the `release` job needs. It calls no model and needs no secrets. It fails when:
- a skill changed since its last recorded run;
- a skill's recorded verdict is NOT READY;
- the typecheck fails.

### Code tests

A judge can pass code that reads well and does not work. A code test runs the code. Five scenarios, one each in `option`, `async-pipelines`, `validate`, `try` and `error-handling`, have a second version in `code-evals/<skill>.json`, with an `output` contract: the names the model's code must export. The tests, in `skill-tests/<skill>/<scenario id>.test.ts`, call that code with fakes (maps, a fake database, a logger, a `writeFileSync`) and check what it returns. They run against every answer, in both arms, and never reach the model. Each test is scored like a criterion, as `[test] <name>`, and the release gate applies to it. `test-packages.json` lists what the code and the tests may import (`@ngwes/mini-fp`).

They have their own config, `skill-be.code-tests.yaml`, so they run without the judged benchmark. These scenarios have no criteria, so the judge is never called: a run is 5 scenarios × 3 reps × 2 arms = 30 generations. Its verdicts go to `.skill-be/code-tests.result.json`, not to `skill-be.result.json`, and `verify` does not read them.

- Locally: `npm run bench:code`, with the `claude` login, as above.
- In CI: `.github/workflows/code-tests.yml` runs it only when started by hand from the Actions tab, on the branch of an open pull request; on any other branch it stops before calling the model. It reads the API key from the repository secret `ANTHROPIC_API_KEY`, and the job fails when a skill is NOT READY. The run's `results.html` is attached to the workflow run.

---

## Available Skills

| Skill | Description |
|---|---|
| `mini-fp` | Router — entry point, decision table, skill index |
| `option` | `Option<T>` and `OptionAsync<T>` reference |
| `either` | `Either<L,R>` and `EitherAsync<L,R>` reference |
| `try` | `Try<T>` and `TryAsync<T>` reference |
| `validate` | `Validate<L,R>`, `sequenceValidate`, `sequenceValidateAsync` reference |
| `utils` | `Unit`, `Union`, traversal functions, functional and list helpers, prelude reference |
| `error-handling` | Pattern: typed error pipelines |
| `validation-patterns` | Pattern: form, DTO, and batch validation |
| `async-pipelines` | Pattern: chaining async operations |

---
