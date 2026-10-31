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

## Helpers

Standalone functions. See the `utils` skill for examples.

```typescript
toOption(value, noneWhen?)            // Option<A>; also (value, map, noneWhen) → Option<M>
toOptionAsync(promise, noneWhen?)     // OptionAsync<A>; also (promise, map, noneWhen)
toEither(value, left)                 // Either<L, R>; left is a value or () => L; also (value, map, leftWhen, left)
toEitherAsync(promise, left)          // EitherAsync<L, R>; also (promise, map, leftWhen, left)
tee(value, action)                    // T: runs action, returns value
teeWhen(value, action, when)          // T: runs action only when `when` holds
teeAsync(promise, action)             // Promise<T>: awaits the value, then the action
teeWhenAsync(promise, action, when)   // Promise<T>
which(condition, onTrue, onFalse)     // T: if/else expression; also (value, condition, onTrue, onFalse)
repeatWhile(init, when, step)         // T: loop as an expression
repeatWhileAsync(init, when, step)    // Promise<T>: init and step may be async
using(resource, fn)                   // T: calls resource.dispose() after fn
usingAsync(resource, fn)              // Promise<T>; also (first, createSecond, fn), disposes both
apply(fn, first)                      // (...rest) => R: fixes the first argument
filterSome(options, predicate?)       // T[]: values of the some
filterRight(eithers, predicate?)      // R[]: right values
filterLeft(eithers, predicate?)       // L[]: left values
mapSome(options, fn)                  // U[]: maps the some values
mapRight(eithers, fn)                 // U[]: maps the right values
mapLeft(eithers, fn)                  // U[]: maps the left values (list helper, not Either.mapLeft)
foldAsync(items, state, folder)       // Promise<S>: async reduce, in order
asTask(value) / asPromise(value)      // Promise<T>
toUnitAsync(promise)                  // Promise<Unit>: awaits, discards the value
```

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
