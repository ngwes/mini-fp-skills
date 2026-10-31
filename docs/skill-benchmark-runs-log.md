## 2026-04-18 — option benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4-7. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-haiku-4-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 0% | 100% | +100pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 0% | +0pp |

**claude-sonnet-4-6**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 100% | 100% | +0pp |

**claude-opus-4-7**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 0% | +0pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-haiku-4-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 0% | 100% | +100pp |
| The chain stops at the first absent value without explicit branching | 0% | 100% | +100pp |

**claude-sonnet-4-6**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

**claude-opus-4-7**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 100% | 100% | +0pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-haiku-4-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 100% | +100pp |
| Uses .bindAsync() for async optional steps | 0% | 100% | +100pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

**claude-sonnet-4-6**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 100% | +100pp |
| Uses .bindAsync() for async optional steps | 0% | 100% | +100pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

**claude-opus-4-7**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 100% | 100% | +0pp |
| Uses .bindAsync() for async optional steps | 100% | 100% | +0pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `async-nullable-noisy-context` — criterion: *"Uses .matchAsync() or .orElseAsync() for the async fallback/response"*

**NOT READY**

## 2026-10-28 — option benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 0% | 100% | +100pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 100% | 0% | -100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 100% | 100% | +0pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 100% | 100% | +0pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps | 100% | 100% | +0pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 0% | +0pp |
| Uses .bindAsync() for async optional steps | 0% | 100% | +100pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 100% | 100% | +0pp |
| Uses .bindAsync() for async optional steps | 100% | 100% | +0pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 100% | 100% | +0pp |
| Uses .bindAsync() for async optional steps | 100% | 100% | +0pp |
| Uses .matchAsync() or .orElseAsync() for the async fallback/response | 0% | 0% | +0pp |

---

## Release Gate

- **BLOCKED** (regression): `nullable-lookup` / claude-sonnet-5-5 — *"Uses .match() or .orElse() to handle the absent case at the call site"*: 100% → 0% (-100pp)
- **BLOCKED** (universal 0%): `async-nullable-noisy-context` — criterion: *"Uses .matchAsync() or .orElseAsync() for the async fallback/response"*

**NOT READY**

## 2026-10-28 — either benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-error-chain *(critical)*

*Write TypeScript: parse a user ID from a raw string (may not be a valid number), then fetch the user from DB (may not exist). Return a typed error at each step. Stop on the first failure.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success | 0% | 100% | +100pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success | 100% | 100% | +0pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success | 100% | 100% | +0pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 100% | 100% | +0pp |

### Scenario: map-transform-both-sides *(critical)*

*Write TypeScript: fetch an order from DB using Either. If found, transform the shipping address to uppercase. If not found, transform the NOT_FOUND error into a user-facing message string. Show both transformations.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value | 100% | 100% | +0pp |
| Uses .mapLeft() to transform the left (error) value | 100% | 100% | +0pp |
| Both branches are handled without pattern matching only at the end | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value | 100% | 100% | +0pp |
| Uses .mapLeft() to transform the left (error) value | 100% | 100% | +0pp |
| Both branches are handled without pattern matching only at the end | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value | 100% | 100% | +0pp |
| Uses .mapLeft() to transform the left (error) value | 100% | 100% | +0pp |
| Both branches are handled without pattern matching only at the end | 100% | 100% | +0pp |

### Scenario: multi-step-pipeline-noisy

*Express route handler: parse request body JSON, validate required fields, check user permissions in DB (async), save record to DB (async). Each step can fail with a different error. Return the appropriate HTTP status code per error type at the end.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 100% | 100% | +0pp |
| Uses .match() at the end to map error codes to HTTP status codes | 0% | 0% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 0% | 100% | +100pp |
| Uses .match() at the end to map error codes to HTTP status codes | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 0% | 100% | +100pp |
| Uses .match() at the end to map error codes to HTTP status codes | 0% | 100% | +100pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-28 — try benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: wrap-throwing-sync *(critical)*

*Write TypeScript: parse a JSON string that may be malformed. Handle the case where JSON.parse throws. Return a default empty object if parsing fails. Do not use try/catch.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 0% | 100% | +100pp |
| Does not use a bare try/catch block | 100% | 100% | +0pp |
| Uses .onFail() to provide the default value on failure | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 100% | 100% | +0pp |
| Does not use a bare try/catch block | 100% | 100% | +0pp |
| Uses .onFail() to provide the default value on failure | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 100% | 100% | +0pp |
| Does not use a bare try/catch block | 100% | 100% | +0pp |
| Uses .onFail() to provide the default value on failure | 100% | 100% | +0pp |

### Scenario: async-exception-boundary *(critical)*

*Write TypeScript: fetch JSON from an external API URL. The fetch may throw (network error) or the .json() parse may throw. Log the error and return a cached fallback value if anything throws. Do not use try/catch.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 100% | 100% | +0pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFailAsync() for the error logging and fallback | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 100% | 100% | +0pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFailAsync() for the error logging and fallback | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 100% | 100% | +0pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFailAsync() for the error logging and fallback | 0% | 0% | +0pp |

### Scenario: noisy-db-exception

*Prisma + Express app. A database query may throw a connection error or a Prisma-specific error. Write a function that runs the query, logs any thrown error to a logger, and returns null on failure. Also show how to check if the result succeeded.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 0% | 100% | +100pp |
| No bare try/catch block present | 0% | 100% | +100pp |
| Uses .isSuccess() / .isFailure() or .onFail() to inspect and handle the error | 0% | 0% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 100% | 100% | +0pp |
| No bare try/catch block present | 100% | 100% | +0pp |
| Uses .isSuccess() / .isFailure() or .onFail() to inspect and handle the error | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 100% | 100% | +0pp |
| No bare try/catch block present | 100% | 100% | +0pp |
| Uses .isSuccess() / .isFailure() or .onFail() to inspect and handle the error | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-28 — validate benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: accumulate-field-errors *(critical)*

*Write TypeScript validators for a signup form: name (required, non-empty), email (must contain @), age (must be >= 18). Run ALL validators and return ALL errors at once, not just the first one.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 0% | 100% | +100pp |
| Uses .combine() to merge results from multiple validators | 0% | 0% | +0pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 100% | 100% | +0pp |
| Uses .combine() to merge results from multiple validators | 100% | 100% | +0pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 100% | 100% | +0pp |
| Uses .combine() to merge results from multiple validators | 100% | 0% | -100pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

### Scenario: dto-typed-errors *(critical)*

*Write a DTO validator for CreateProductDto: name (non-empty string), price (positive number), stock (non-negative integer). Each validator should return a typed FieldError object with a field name and message. Accumulate ALL errors.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() with typed error objects | 100% | 100% | +0pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() with typed error objects | 100% | 100% | +0pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() with typed error objects | 100% | 100% | +0pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 100% | 100% | +0pp |

### Scenario: batch-array-validation

*Write TypeScript: validate an array of numbers where each must be positive and less than 1000. Return ALL numbers that fail with their index and reason. Use sequenceValidate.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (regression): `accumulate-field-errors` / claude-opus-5-5 — *"Uses .combine() to merge results from multiple validators"*: 100% → 0% (-100pp)

**NOT READY**

## 2026-10-28 — error-handling benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-pipeline-http *(critical)*

*Write a TypeScript HTTP handler: parse a user ID from request params, fetch the user from DB (async), check the user has admin role. Each step returns a typed AppError with a code field. Map error codes to HTTP status codes at the end. Do not use exceptions.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 100% | 100% | +0pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 0% | 100% | +100pp |
| Uses .match() to map error codes to HTTP status codes at the end | 0% | 0% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 0% | 100% | +100pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 0% | 100% | +100pp |
| Uses .match() to map error codes to HTTP status codes at the end | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 100% | 100% | +0pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 100% | 100% | +0pp |
| Uses .match() to map error codes to HTTP status codes at the end | 0% | 0% | +0pp |

### Scenario: wrap-third-party-throws *(critical)*

*A third-party crypto library exposes hash(data: string): string but throws on invalid input. Write a TypeScript wrapper that returns Either<Error, string> instead of throwing. Also show how to use it in a pipeline.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try result to Either (right on success, left on failure) | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try result to Either (right on success, left on failure) | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try result to Either (right on success, left on failure) | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 0% | 100% | +100pp |

### Scenario: error-fallback-recovery

*Write TypeScript: look up a value from Redis cache (returns Either<'miss', CachedValue>). If cache miss (Left), fall back to a DB query (async, also returns Either<'db_error', DbValue>). If DB also misses, return Left. Show the full fallback chain.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() to represent cache miss and DB miss | 0% | 100% | +100pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 100% | 100% | +0pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() to represent cache miss and DB miss | 0% | 100% | +100pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 100% | 100% | +0pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() to represent cache miss and DB miss | 0% | 100% | +100pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 100% | 100% | +0pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-28 — validation-patterns benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: form-all-errors *(critical)*

*Write TypeScript validators for a user registration form: username (3-20 chars), email (contains @ and domain), password (min 8 chars, at least one uppercase, one digit). Show ALL errors at once — do not stop at the first failure.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 0% | 100% | +100pp |
| Uses .combine() across all field validators to accumulate errors | 0% | 100% | +100pp |
| A test case with all three fields invalid produces three errors, not one | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 100% | 100% | +0pp |
| Uses .combine() across all field validators to accumulate errors | 100% | 100% | +0pp |
| A test case with all three fields invalid produces three errors, not one | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 100% | 100% | +0pp |
| Uses .combine() across all field validators to accumulate errors | 100% | 100% | +0pp |
| A test case with all three fields invalid produces three errors, not one | 100% | 100% | +0pp |

### Scenario: typed-field-errors *(critical)*

*Write a DTO validator for UpdateProfileDto: bio (max 500 chars), website (must start with https://). Each error must be a FieldError object with field and message properties. Accumulate errors from both fields.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 0% | 100% | +100pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 0% | 100% | +100pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 100% | 100% | +0pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 100% | 100% | +0pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 100% | 100% | +0pp |

### Scenario: batch-product-validation

*Write TypeScript: validate an array of Product objects where each must have a positive price and non-empty name. Use sequenceValidate. Return the indices and reasons for all invalid products.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-29 — async-pipelines benchmark

Method: automated cross-model eval via `claude -p`. Models: claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5. Reps: 1.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: option-async-chain *(critical)*

*Write TypeScript: validate a bearer token (async, may return null user ID), then load user preferences from DB (async, may not exist), then load their recommended items (async, may not exist). Short-circuit at the first absent value. No nested callbacks or intermediate awaits between chain steps.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async optional steps on Option | 0% | 100% | +100pp |
| Does not use intermediate await between chain steps (stays in the chain) | 100% | 100% | +0pp |
| Returns OptionAsync or Promise<Option<T>>, not nested nulls | 0% | 0% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async optional steps on Option | 0% | 100% | +100pp |
| Does not use intermediate await between chain steps (stays in the chain) | 0% | 100% | +100pp |
| Returns OptionAsync or Promise<Option<T>>, not nested nulls | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async optional steps on Option | 100% | 100% | +0pp |
| Does not use intermediate await between chain steps (stays in the chain) | 100% | 100% | +0pp |
| Returns OptionAsync or Promise<Option<T>>, not nested nulls | 100% | 100% | +0pp |

### Scenario: either-async-chain *(critical)*

*Write TypeScript: authenticate an API token (async, returns Either<ApiError, UserId>), fetch the user (async, returns Either<ApiError, User>), check admin role (sync). Return typed errors at each step. Show consumption with match at the end.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 100% | 100% | +0pp |
| Mixes sync .bind() and async .bindAsync() in the same chain | 100% | 100% | +0pp |
| Uses .match() at consumption point to handle both success and error cases | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 0% | 100% | +100pp |
| Mixes sync .bind() and async .bindAsync() in the same chain | 0% | 100% | +100pp |
| Uses .match() at consumption point to handle both success and error cases | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 100% | 100% | +0pp |
| Mixes sync .bind() and async .bindAsync() in the same chain | 100% | 100% | +0pp |
| Uses .match() at consumption point to handle both success and error cases | 100% | 100% | +0pp |

### Scenario: mixed-sync-async-noisy

*Express + Prisma + Redis pipeline: parse raw body (sync), validate schema (sync), check rate limit from Redis (async), save to Prisma (async), publish event to queue (async). Each step can fail. Stop on first failure and return structured error.*

**claude-haiku-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 100% | 100% | +0pp |
| Does not await between chain steps — stays fluent | 100% | 100% | +0pp |
| Error type propagates consistently through the entire chain | 100% | 100% | +0pp |

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 0% | 100% | +100pp |
| Does not await between chain steps — stays fluent | 0% | 100% | +100pp |
| Error type propagates consistently through the entire chain | 0% | 100% | +100pp |

**claude-opus-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 100% | 100% | +0pp |
| Does not await between chain steps — stays fluent | 100% | 100% | +0pp |
| Error type propagates consistently through the entire chain | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — option benchmark

Method: automated eval via `claude -p`. Models: claude-sonnet-5-5. Reps: 3.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() (or the equivalent some()/none()/toOption() functions) instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 100% | 33% | -67pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps (.map() is also acceptable for reading a field that may be undefined, since map turns null/undefined into none) | 100% | 100% | +0pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 100% | 100% | +0pp |
| Uses Option.fromAsync() and/or .bindAsync() for the async optional steps | 100% | 100% | +0pp |
| Produces the 404/success response with .match() or .orElse() on the async Option chain (these return a Promise there), or with .matchAsync()/.orElseAsync() | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (regression): `nullable-lookup` / claude-sonnet-5-5 — *"Uses .match() or .orElse() to handle the absent case at the call site"*: 100% → 33% (-67pp)

**NOT READY**

