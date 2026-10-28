---
name: mini-fp
description: Entry point for @ngwes/mini-fp. Invoke this first when working with the library to select the right type or pattern skill.
---

`@ngwes/mini-fp` is a minimal TypeScript FP library. Zero production dependencies. All types are classes with static constructors; `some`, `none`, `right`, `left`, `valid` and `invalid` are also exported as plain functions.

## Install

```bash
npm i @ngwes/mini-fp
```

## Decision Table

| Scenario | Use |
|---|---|
| Value may be absent (replaces `null`/`undefined`) | `Option<T>` |
| Operation may fail with typed error; stop on first failure | `Either<L, R>` |
| Wrapping third-party code that may throw (lazy, convert with `toEither`) | `Try<T>` / `TryAsync<T>` |
| Collect **all** validation errors, not just the first | `Validate<L, R>` |
| One of two/three equal cases (no success/failure meaning) | `Union<T1, T2>` / `Union3` |
| Void return value in a generic context | `Unit` (`toUnitAsync` for promises) |
| Convert a list of monads into a monad of a list | traversal utils (`traverseEither`, `bindAllAsync`, …) |
| Pick or map the `some`/`right`/`left` values of an array | list helpers (`filterSome`, `mapRight`, …) |
| Nullable value → `Option`/`Either` | `toOption` / `toEither` (+ `Async`) |
| Side effect, branch, loop or cleanup as an expression | `tee`, `which`, `repeatWhile`, `using`, `apply` |

## Available Skills

| Skill | When to invoke |
|---|---|
| `option` | Working with optional / nullable values |
| `either` | Propagating typed errors through a pipeline |
| `try` | Wrapping code that throws exceptions |
| `validate` | Accumulating multiple validation errors |
| `utils` | Using `Unit`, `Union`, traversal functions, functional/list helpers, or the prelude |
| `error-handling` | Building typed error pipelines (pattern) |
| `validation-patterns` | Validating forms, DTOs, or batches (pattern) |
| `async-pipelines` | Chaining async operations safely (pattern) |

**Rule:** After reading this skill, invoke the specific skill for the type or pattern you need.
