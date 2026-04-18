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
