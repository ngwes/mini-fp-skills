---
name: mini-fp
description: Entry point for @ngwes/mini-fp. Invoke this first when working with the library to select the right type or pattern skill.
---

`@ngwes/mini-fp` is a minimal TypeScript FP library. Zero production dependencies. All types are classes with static constructors.

## Install

```bash
npm i @ngwes/mini-fp
```

## Decision Table

| Scenario | Use |
|---|---|
| Value may be absent (replaces `null`/`undefined`) | `Option<T>` |
| Operation may fail with typed error; stop on first failure | `Either<L, R>` |
| Wrapping third-party code that may throw | `Try<T>` / `TryAsync<T>` |
| Collect **all** validation errors, not just the first | `Validate<L, R>` |
| Void return value in a generic context | `Unit` |
| Convert a list of monads into a monad of a list | traversal utils |

## Available Skills

| Skill | When to invoke |
|---|---|
| `ngwes/mini-fp:option` | Working with optional / nullable values |
| `ngwes/mini-fp:either` | Propagating typed errors through a pipeline |
| `ngwes/mini-fp:try` | Wrapping code that throws exceptions |
| `ngwes/mini-fp:validate` | Accumulating multiple validation errors |
| `ngwes/mini-fp:utils` | Using `Unit`, traversal functions, or `asTask` |
| `ngwes/mini-fp:error-handling` | Building typed error pipelines (pattern) |
| `ngwes/mini-fp:validation-patterns` | Validating forms, DTOs, or batches (pattern) |
| `ngwes/mini-fp:async-pipelines` | Chaining async operations safely (pattern) |

**Rule:** After reading this skill, invoke the specific skill for the type or pattern you need.
