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

The `evals/` and `scripts/run-benchmark.mjs` files exist to verify that each skill actually improves model output before a release — and to block releases when it doesn't.

**Why:** Skills can fail in two ways: they don't trigger (model ignores the context), or they hurt performance (model produces worse output with the skill than without). Neither failure is visible from reading the skill content alone — you need to run the model and measure.

**How it works:** For each skill, `evals/<skill>.json` defines 3 scenarios with binary criteria. The runner calls `claude -p` on Sonnet (`claude-sonnet-5-5`), with and without the skill content injected, repeating each run N times. A Haiku-based LLM judge grades each criterion. Results are appended to `docs/skill-benchmark-runs.md`.

**Release gate** — a change is not ready if:
- Any criterion is 0% on every model under test (currently Sonnet only) with the skill enabled.
- Any critical scenario shows a negative delta on any model.

```bash
node scripts/run-benchmark.mjs <skill> [--reps N] >> docs/skill-benchmark-runs-log.md
```

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
