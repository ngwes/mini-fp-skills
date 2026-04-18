# mini-fp Agent Docs

Claude Code skill plugin for [`@ngwes/mini-fp`](https://www.npmjs.com/package/@ngwes/mini-fp) — a minimal TypeScript functional programming library.

These skills are loaded by coding agents (Claude Code, Copilot, Cursor) when working on projects that use `@ngwes/mini-fp`.

---

## Installation

### Option A: Plugin

```bash
claude plugins install ngwes/mini-fp-agent-docs
```

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

---

## Skill Benchmarking

The `evals/` and `scripts/run-benchmark.mjs` files exist to verify that each skill actually improves model output before a release — and to block releases when it doesn't.

**Why:** Skills can fail in two ways: they don't trigger (model ignores the context), or they hurt performance (model produces worse output with the skill than without). Neither failure is visible from reading the skill content alone — you need to run the model and measure.

**How it works:** For each skill, `evals/<skill>.json` defines 3 scenarios with binary criteria. The runner calls `claude -p` across 3 models (Haiku, Sonnet, Opus), with and without the skill content injected, repeating each run N times. A Haiku-based LLM judge grades each criterion. Results are appended to `docs/skill-benchmark-runs.md`.

**Release gate** — a change is not ready if:
- Any criterion is 0% across all three models with the skill enabled.
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
| `utils` | `Unit`, traversal functions, `asTask` reference |
| `error-handling` | Pattern: typed error pipelines |
| `validation-patterns` | Pattern: form, DTO, and batch validation |
| `async-pipelines` | Pattern: chaining async operations |

---
