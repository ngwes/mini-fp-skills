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
cp skills/*.md ~/.claude/skills/
```

---

## Usage

Add this to the `CLAUDE.md` in your project (the one that uses `@ngwes/mini-fp`):

```markdown
When working with @ngwes/mini-fp, invoke the `ngwes/mini-fp` skill first.
```

The agent will load the router skill, identify the right type or pattern, and invoke the specific skill automatically.

---

## Available Skills

| Skill | Description |
|---|---|
| `ngwes/mini-fp` | Router — entry point, decision table, skill index |
| `ngwes/mini-fp:option` | `Option<T>` and `OptionAsync<T>` reference |
| `ngwes/mini-fp:either` | `Either<L,R>` and `EitherAsync<L,R>` reference |
| `ngwes/mini-fp:try` | `Try<T>` and `TryAsync<T>` reference |
| `ngwes/mini-fp:validate` | `Validate<L,R>`, `sequenceValidate`, `sequenceValidateAsync` reference |
| `ngwes/mini-fp:utils` | `Unit`, traversal functions, `asTask` reference |
| `ngwes/mini-fp:error-handling` | Pattern: typed error pipelines |
| `ngwes/mini-fp:validation-patterns` | Pattern: form, DTO, and batch validation |
| `ngwes/mini-fp:async-pipelines` | Pattern: chaining async operations |

---
