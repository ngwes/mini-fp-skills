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

## 2026-10-31 — option benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() (or the equivalent some()/none()/toOption() functions) instead of null/undefined | 100% | 100% | +0pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 0% | +0pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps (.map() is also acceptable for reading a field that may be undefined, since map turns null/undefined into none) | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 0% | 100% | +100pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 100% | +100pp |
| Uses Option.fromAsync() and/or .bindAsync() for the async optional steps | 0% | 100% | +100pp |
| Produces the 404/success response with .match() or .orElse() on the async Option chain (these return a Promise there), or with .matchAsync()/.orElseAsync() | 0% | 100% | +100pp |

### Scenario: theme-fallback-chain *(critical)*

*Write TypeScript: resolve a user's UI theme. Read it from userSettings (Map<string, string>, keyed by user ID); the stored value may be missing or may be an unsupported string, and only 'light', 'dark' and 'system' are valid. When the user has no valid theme, write a debug log line, then fall back to the organization default from orgSettings (Map<string, string>, same rules: may be missing or invalid). If that also yields nothing, use 'system'. Write it as one chain, without if statements or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary) | 0% | 0% | +0pp |
| Falls back to the organization default with .bindNone() or .mapNone() on the Option chain (not with nested null checks or by unwrapping the first Option) | 0% | 100% | +100pp |
| Logs the debug line with .onNone() (or .onSome() for the found case) inside the chain, and still ends with .orElse('system') or .match() to produce the final string | 0% | 0% | +0pp |

### Scenario: cache-then-db-to-either

*Write TypeScript: get a product by SKU. First look in an in-memory cache (Map<string, Product>); if it is not there, load it from the database with db.findProduct(sku): Promise<Product | null>. Write a debug log whenever a product is found. Return an async result that is either a NotFoundError (which must include the SKU) or the Product, so the HTTP layer can turn it into a 404.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Falls back to the async database load with .bindNoneAsync() or .mapNoneAsync() on the cache Option, instead of an if/else on the cache result | 0% | 100% | +100pp |
| Converts the Option (or OptionAsync) into an Either with its .toEither(...) method, passing a NotFoundError value or factory that includes the SKU | 0% | 100% | +100pp |
| Logs found products with .onSome() in the chain, not with a separate isSome() check or an if | 0% | 100% | +100pp |

### Scenario: loyalty-tier-guards-noisy

*NestJS + TypeORM service. Load a customer's loyalty points from the repository (findPoints(customerId): number | undefined). Map the points to a tier: 10000 or more is 'gold', 5000 or more is 'silver', anything else is 'bronze'. Then pick a coupon for the tier: gold customers get a personal coupon from couponService.personal(customerId): Promise<Coupon>, silver and bronze customers get couponService.standard(tier): Promise<Coupon>. A customer without points gets no coupon. Avoid if/else ladders and nested ternaries; the method returns the coupon as an optional value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardMap() with [when, then] guard pairs (and an otherwise function) to map the points to a tier, instead of if/else or a chain of ternaries | 0% | 100% | +100pp |
| Uses .guardMapAsync() or .guardBindAsync() to choose between the personal and the standard coupon call | 0% | 100% | +100pp |
| Returns an Option/OptionAsync (or a Promise of an Option) for the coupon, never null/undefined, and an absent customer skips the tier and coupon steps | 0% | 0% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `nullable-lookup` — criterion: *"Uses .match() or .orElse() to handle the absent case at the call site"*
- **BLOCKED** (universal 0%): `theme-fallback-chain` — criterion: *"Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary)"*
- **BLOCKED** (universal 0%): `theme-fallback-chain` — criterion: *"Logs the debug line with .onNone() (or .onSome() for the found case) inside the chain, and still ends with .orElse('system') or .match() to produce the final string"*
- **BLOCKED** (universal 0%): `loyalty-tier-guards-noisy` — criterion: *"Returns an Option/OptionAsync (or a Promise of an Option) for the coupon, never null/undefined, and an absent customer skips the tier and coupon steps"*

**NOT READY**

## 2026-10-31 — either benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-error-chain *(critical)*

*Write TypeScript: parse a user ID from a raw string (may not be a valid number), then fetch the user from DB (may not exist). Return a typed error at each step. Stop on the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success (or the equivalent left()/right() functions, or toEither()/Option.toEither() to turn a missing value into a left) | 0% | 100% | +100pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 0% | 0% | +0pp |

### Scenario: map-transform-both-sides *(critical)*

*Write TypeScript: fetch an order from DB using Either. If found, transform the shipping address to uppercase. If not found, transform the NOT_FOUND error into a user-facing message string. Show both transformations.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value, on an Either or directly on an async Either chain | 100% | 100% | +0pp |
| Uses .mapLeft() to transform the left (error) value, on an Either or directly on an async Either chain | 100% | 100% | +0pp |
| Both branches are handled without pattern matching only at the end | 0% | 100% | +100pp |

### Scenario: multi-step-pipeline-noisy

*Express route handler: parse request body JSON, validate required fields, check user permissions in DB (async), save record to DB (async). Each step can fail with a different error. Return the appropriate HTTP status code per error type at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 100% | 100% | +0pp |
| Uses .match() at the end to map error codes to HTTP status codes | 0% | 0% | +0pp |

### Scenario: log-success-and-failure

*Write TypeScript: parse a payment amount from a query-string value into Either<PaymentError, number>, where PaymentError is { code: 'NOT_A_NUMBER' | 'NOT_POSITIVE' | 'TOO_MANY_DECIMALS'; raw: string }. Then convert the amount to integer cents. Log logger.info with the parsed amount when parsing succeeds and logger.warn with the error code when it fails, while still returning the Either<PaymentError, number> in cents to the caller.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .onRight() to log the parsed amount inside the chain | 100% | 100% | +0pp |
| Uses .onLeft() to log the error inside the chain | 100% | 100% | +0pp |
| Returns the Either (converted to cents with .map()) without consuming it with match/unwrap and without an if around the result for the logging | 0% | 0% | +0pp |

### Scenario: shipping-rules-guards

*Write TypeScript: a validator returns Either<OrderError, Order>, where Order has weightKg and destinationCountry. Orders shipped to an embargoed country (a Set<string>) must become an EMBARGOED OrderError; other orders continue. Then choose the shipping method from the weight: over 50 kg is 'freight', over 5 kg is 'parcel', anything else is 'letter'. An invalid order from the validator must keep its original error. Avoid if/else ladders and nested ternaries.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBind() (or .guardBindAsync()) with a [when, then] guard to turn embargoed orders into a Left while other orders stay Right | 0% | 100% | +100pp |
| Uses .guardMap() (or .guardMapAsync()) with [when, then] guards to pick the shipping method from the weight, instead of if/else or nested ternaries | 0% | 100% | +100pp |
| Does not check isLeft()/isRight() manually: the validator's Left passes through the guard steps unchanged | 100% | 100% | +0pp |

### Scenario: refund-routing-async-noisy

*Express + Stripe + PostgreSQL. A refund request has already been validated into Either<RefundError, Refund>. Route it to the right processor: refunds over 1000 EUR go to manualReview.submit(refund), card payments go to stripeRefunds.create(refund), everything else goes to walletRefunds.credit(refund). Each processor returns Promise<Either<RefundError, Receipt>>. Log the receipt ID on success, then send the HTTP response (201 with the receipt, or a status that depends on the error code).*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBindAsync() with [when, then] guard pairs to route the refund to the async processor, instead of if/else or a switch | 0% | 100% | +100pp |
| Logs the receipt with .onRight() on the async Either chain (not after awaiting it in a separate if) | 0% | 100% | +100pp |
| Consumes the result once with .match() or .matchAsync() to send both the success and the error responses | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `typed-error-chain` — criterion: *"Uses .bind() or .bindAsync() to chain steps without manual if checks"*
- **BLOCKED** (universal 0%): `multi-step-pipeline-noisy` — criterion: *"Uses .match() at the end to map error codes to HTTP status codes"*
- **BLOCKED** (universal 0%): `log-success-and-failure` — criterion: *"Returns the Either (converted to cents with .map()) without consuming it with match/unwrap and without an if around the result for the logging"*

**NOT READY**

## 2026-10-31 — try benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: wrap-throwing-sync *(critical)*

*Write TypeScript: parse a JSON string that may be malformed. Handle the case where JSON.parse throws. Return a default empty object if parsing fails. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 0% | 100% | +100pp |
| Does not use a bare try/catch block | 100% | 100% | +0pp |
| Uses .onFail() (with a value, a factory, or an error handler) or .match() with a fallback to provide the default value on failure | 100% | 100% | +0pp |

### Scenario: async-exception-boundary *(critical)*

*Write TypeScript: fetch JSON from an external API URL. The fetch may throw (network error) or the .json() parse may throw. Log the error and return a cached fallback value if anything throws. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 0% | 100% | +100pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFail(), .onFailAsync() or .match() on the TryAsync for the error logging and fallback | 0% | 100% | +100pp |

### Scenario: noisy-db-exception

*Prisma + Express app. A database query may throw a connection error or a Prisma-specific error. Write a function that runs the query, logs any thrown error to a logger, and returns null on failure. Also show how to check if the result succeeded.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 0% | 100% | +100pp |
| No bare try/catch block present | 0% | 100% | +100pp |
| Handles the error with .match(), .onFail()/.onFailAsync(), .toEither(), or .isSuccess()/.isFailure() on the awaited Try, without consuming an un-memoized TryAsync more than once (each consumption re-runs the query) | 0% | 100% | +100pp |

### Scenario: config-read-once *(critical)*

*Write TypeScript: read config.json from disk with fs.readFileSync, parse it with JSON.parse and extract its port number (throw if port is not a number). Any of these steps may throw. During startup the result is used several times (to check whether it loaded, to log it, then to start the server), but a successful read must happen only once. Fall back to port 3000 on failure. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Chains the read, the parse and/or the port extraction as separate steps with Try's .map() and/or .bind() (e.g. .bind(raw => Try.run(() => JSON.parse(raw)))) instead of one big closure | 0% | 100% | +100pp |
| Prevents re-reading the file on repeated use: calls .memo() on the Try that is consumed several times (a Try returned by .map()/.bind() also counts, since those results are memoized) | 0% | 100% | +100pp |
| Falls back to 3000 with .onFail(3000), .onFail(() => 3000) or .match(..., 3000), with no try/catch block | 0% | 0% | +0pp |

### Scenario: sdk-session-user-chain *(critical)*

*Write TypeScript: a vendor SDK exposes getSession(token): Promise<Session> and getUser(userId): Promise<User>; both may throw or reject. Load the session, then load the user from session.userId, write an audit entry with audit.record(user.id) once the user is loaded, and return an async result typed as either an error message string or the User. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the SDK calls with TryAsync.runAsync() (or Try.runAsync()) and chains the user load onto the session load with the TryAsync .bind() method | 0% | 100% | +100pp |
| Writes the audit entry with TryAsync's .do() (or with .onRight() after converting to Either), so it is skipped on failure and not placed inside the runAsync callback | 0% | 0% | +0pp |
| Converts the result with .toEither() on the TryAsync and maps the error to a message string with .mapLeft(), with no try/catch block | 0% | 100% | +100pp |

### Scenario: shared-remote-flags-noisy

*Express + node-fetch app with Winston logging. Feature flags are fetched from a remote URL (fetch(url).then(r => r.json()), which may reject or throw). Several middlewares need the flags on every request. Fetch them once and share the result between all middlewares and concurrent requests; if the fetch fails, log the error, use DEFAULT_FLAGS for that request and try fetching again on the next request. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Creates the flags loader with TryAsync.runAsync(...) (or Try.runAsync) followed by .memo(), stored once and reused by the middlewares | 0% | 100% | +100pp |
| Does not hand-roll the caching or the retry (no separate cached-flags variable, promise cache or retry flag besides the memoized TryAsync) | 0% | 0% | +0pp |
| Falls back to DEFAULT_FLAGS and logs the error with .onFail(), .onFailAsync() or .match() on the memoized TryAsync, with no try/catch block | 0% | 100% | +100pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `config-read-once` — criterion: *"Falls back to 3000 with .onFail(3000), .onFail(() => 3000) or .match(..., 3000), with no try/catch block"*
- **BLOCKED** (universal 0%): `sdk-session-user-chain` — criterion: *"Writes the audit entry with TryAsync's .do() (or with .onRight() after converting to Either), so it is skipped on failure and not placed inside the runAsync callback"*
- **BLOCKED** (universal 0%): `shared-remote-flags-noisy` — criterion: *"Does not hand-roll the caching or the retry (no separate cached-flags variable, promise cache or retry flag besides the memoized TryAsync)"*

**NOT READY**

## 2026-10-31 — validate benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: accumulate-field-errors *(critical)*

*Write TypeScript validators for a signup form: name (required, non-empty), email (must contain @), age (must be >= 18). Run ALL validators and return ALL errors at once, not just the first one.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 0% | 100% | +100pp |
| Uses .combine() to merge results from multiple validators | 0% | 100% | +100pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

### Scenario: dto-typed-errors *(critical)*

*Write a DTO validator for CreateProductDto: name (non-empty string), price (positive number), stock (non-negative integer). Each validator should return a typed FieldError object with a field name and message. Accumulate ALL errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() (or the equivalent valid()/invalid() functions) with typed error objects | 100% | 100% | +0pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 0% | 100% | +100pp |

### Scenario: batch-array-validation

*Write TypeScript: validate an array of numbers where each must be positive and less than 1000. Return ALL numbers that fail with their index and reason. Use sequenceValidate.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

### Scenario: field-errors-to-http-response *(critical)*

*Write TypeScript: existing validators return Validate<string, T> with messages formatted as 'field: reason' (e.g. 'email: must contain @'). For a CreateAccount request (email, password, age), run all the validators and accumulate every error. The HTTP layer needs FieldError objects { field, message } instead of strings. Return { status: 201, body: account } when valid, or { status: 422, body: FieldError[] } listing every error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each string error into a FieldError with .mapInvalid() on the Validate, instead of unwrapInvalid().map(...) inside an isInvalid() branch | 0% | 100% | +100pp |
| Builds both responses with a single .match() on the combined Validate (no isValid()/unwrap() branching) | 0% | 100% | +100pp |
| Accumulates the errors of all fields with .combine() or sequenceValidate | 100% | 100% | +0pp |

### Scenario: recover-optional-field

*Write TypeScript: a profile form has username (required, 3-20 chars) and displayName (optional). validateDisplayName(s) returns Validate<string, string> and fails with 'displayName: empty' for an empty value or with other messages such as 'displayName: too long'. When the only problem is that displayName is empty, use the username as the display name instead of failing; any other displayName errors must still be reported. All errors of all fields must be returned together.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindInvalid() on the displayName Validate to inspect the whole error list and recover with a valid value when the only error is 'empty' | 0% | 100% | +100pp |
| Keeps the other displayName errors invalid (returns the errors from bindInvalid, or does not recover) instead of dropping them | 100% | 100% | +0pp |
| Combines the username and displayName results with .combine() (or sequenceValidate) so errors from both fields are reported together | 0% | 0% | +0pp |

### Scenario: async-save-on-valid-noisy

*Express + Prisma signup route. Validate email and password synchronously, and check that the email is not already taken with an async isEmailTaken(email): Promise<boolean>; report all problems together. When everything is valid, save the user with prisma.user.create(...) and respond 201 with the user; otherwise respond 422 with the list of errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Merges the async uniqueness check with .combineAsync() (or sequenceValidateAsync) so its error is accumulated with the sync errors | 0% | 0% | +0pp |
| Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response | 0% | 0% | +0pp |
| Does not branch on isValid()/isInvalid() or call unwrap()/unwrapInvalid() to build the responses | 0% | 0% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `recover-optional-field` — criterion: *"Combines the username and displayName results with .combine() (or sequenceValidate) so errors from both fields are reported together"*
- **BLOCKED** (universal 0%): `async-save-on-valid-noisy` — criterion: *"Merges the async uniqueness check with .combineAsync() (or sequenceValidateAsync) so its error is accumulated with the sync errors"*
- **BLOCKED** (universal 0%): `async-save-on-valid-noisy` — criterion: *"Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response"*
- **BLOCKED** (universal 0%): `async-save-on-valid-noisy` — criterion: *"Does not branch on isValid()/isInvalid() or call unwrap()/unwrapInvalid() to build the responses"*

**NOT READY**

## 2026-10-31 — error-handling benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-pipeline-http *(critical)*

*Write a TypeScript HTTP handler: parse a user ID from request params, fetch the user from DB (async), check the user has admin role. Each step returns a typed AppError with a code field. Map error codes to HTTP status codes at the end. Do not use exceptions.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 0% | 100% | +100pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 0% | 100% | +100pp |
| Uses .match() to map error codes to HTTP status codes at the end | 0% | 100% | +100pp |

### Scenario: wrap-third-party-throws *(critical)*

*A third-party crypto library exposes hash(data: string): string but throws on invalid input. Write a TypeScript wrapper that returns Either<Error, string> instead of throwing. Also show how to use it in a pipeline.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try to Either with .toEither() (typically followed by .mapLeft() to get an Error) or with a single .match(), not by consuming the lazy Try twice (e.g. .isSuccess() then .onFail()) without .memo() | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 100% | 100% | +0pp |

### Scenario: error-fallback-recovery

*Write TypeScript: look up a value from Redis cache (returns Either<'miss', CachedValue>). If cache miss (Left), fall back to a DB query (async, also returns Either<'db_error', DbValue>). If DB also misses, return Left. Show the full fallback chain.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() (or the equivalent left() function) to represent cache miss and DB miss | 100% | 100% | +0pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 0% | 100% | +100pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 100% | +0pp |

### Scenario: nullable-lookups-to-typed-errors *(critical)*

*Write TypeScript: an order-cancellation flow uses a repository whose methods return T | null: findOrder(id), findCustomer(order.customerId) and findPaymentFor(order.id). Each missing record must become a typed AppError { code: 'ORDER_NOT_FOUND' | 'CUSTOMER_NOT_FOUND' | 'PAYMENT_NOT_FOUND'; message: string }, and the flow stops at the first missing record. Do not use exceptions or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each nullable result into an Either with toEither(value, error) or Option.from(value).toEither(error) (value or factory), instead of if/null checks | 0% | 100% | +100pp |
| Uses a typed error with a code field for each missing record | 100% | 100% | +0pp |
| Chains the lookups with .bind() (or .bindAsync()) so later lookups do not run after the first Left | 0% | 100% | +100pp |

### Scenario: void-write-to-either

*Write TypeScript: save a report to disk with fs.writeFileSync(path, contents), which returns nothing and throws on permission or disk errors. Expose saveReport(path, contents) that returns an Either whose error side is AppError { code: 'WRITE_FAILED'; message: string } and whose success side carries no data, so it can be chained with other Either steps. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the write with Try.run() | 0% | 100% | +100pp |
| Maps the void result to Unit.default with Try's .map() before calling .toEither() (toEither throws on an undefined value) | 0% | 100% | +100pp |
| Maps the error to the WRITE_FAILED AppError with .mapLeft() (or builds it in a single .match()), with no try/catch block | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — validation-patterns benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: form-all-errors *(critical)*

*Write TypeScript validators for a user registration form: username (3-20 chars), email (contains @ and domain), password (min 8 chars, at least one uppercase, one digit). Show ALL errors at once — do not stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 0% | 100% | +100pp |
| Uses .combine() across all field validators to accumulate errors | 0% | 100% | +100pp |
| A test case with all three fields invalid produces three errors, not one | 0% | 0% | +0pp |

### Scenario: typed-field-errors *(critical)*

*Write a DTO validator for UpdateProfileDto: bio (max 500 chars), website (must start with https://). Each error must be a FieldError object with field and message properties. Accumulate errors from both fields.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 0% | 100% | +100pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 0% | 100% | +100pp |

### Scenario: batch-product-validation

*Write TypeScript: validate an array of Product objects where each must have a positive price and non-empty name. Use sequenceValidate. Return the indices and reasons for all invalid products.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `form-all-errors` — criterion: *"A test case with all three fields invalid produces three errors, not one"*

**NOT READY**

## 2026-10-31 — async-pipelines benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: option-async-chain *(critical)*

*Write TypeScript: validate a bearer token (async, may return null user ID), then load user preferences from DB (async, may not exist), then load their recommended items (async, may not exist). Short-circuit at the first absent value. No nested callbacks or intermediate awaits between chain steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain the async optional steps on Option (the chain may start from Option.from() or Option.fromAsync()) | 0% | 100% | +100pp |
| Does not await or call .then() between chain steps: each step is chained directly on the async Option (an await inside a step's callback is fine) | 0% | 100% | +100pp |
| Returns OptionAsync, Promise<Option<T>>, or a Promise of a plain value produced by .match()/.orElse() at the end of the chain, not nested nulls | 100% | 0% | -100pp |

### Scenario: either-async-chain *(critical)*

*Write TypeScript: authenticate an API token (async, returns Either<ApiError, UserId>), fetch the user (async, returns Either<ApiError, User>), check admin role (sync). Return typed errors at each step. Show consumption with match at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 0% | 100% | +100pp |
| Runs the sync admin check with .bind() directly on the async Either chain, in the same chain as the .bindAsync() steps (not wrapped in .bindAsync()/Promise.resolve and not after an intermediate await) | 0% | 0% | +0pp |
| Uses .match() at consumption point to handle both success and error cases (awaiting chain.match(...) on the async chain, or .match() on the awaited Either) | 100% | 100% | +0pp |

### Scenario: mixed-sync-async-noisy

*Express + Prisma + Redis pipeline: parse raw body (sync), validate schema (sync), check rate limit from Redis (async), save to Prisma (async), publish event to queue (async). Each step can fail. Stop on first failure and return structured error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 0% | 100% | +100pp |
| Does not await between chain steps — stays fluent | 0% | 100% | +100pp |
| Error type propagates consistently through the entire chain | 0% | 100% | +100pp |

### Scenario: filter-on-async-option

*Write TypeScript: load a user's subscription with db.subscriptions.find(userId): Promise<Subscription | null>, ignore it if it has expired (subscription.expiresAt < new Date()), then load its plan with db.plans.find(subscription.planId): Promise<Plan | null>. Return the plan name, or 'free' when any step yields nothing. Keep it as one chain with no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() directly on the async Option chain to drop an expired subscription (not an if inside a bindAsync callback or a separate await) | 0% | 100% | +100pp |
| Chains the plan lookup with .bindAsync() on the same chain, without awaiting or calling .then() between steps | 0% | 0% | +0pp |
| Ends the chain with .orElse('free'), .orElseAsync() or .match() to produce the plan name | 0% | 100% | +100pp |

### Scenario: upstream-call-into-either

*Write TypeScript: call billingApi.getInvoice(id): Promise<Invoice>, which may reject with network or HTTP errors. Turn any failure into an ApiError { code: 'UPSTREAM'; message: string }, then reject unpaid invoices with { code: 'UNPAID' } (sync check), log a warning with the error code whenever the pipeline fails, and return EitherAsync<ApiError, Invoice>. No try/catch and no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the call with TryAsync.runAsync() (or Try.runAsync()) and joins the Either pipeline with .toEither() | 0% | 100% | +100pp |
| Maps the caught error to the ApiError with .mapLeft() and runs the unpaid check with .bind(), both directly on the async Either chain | 0% | 100% | +100pp |
| Logs failures with .onLeft() on the async Either chain instead of awaiting and checking isLeft() | 0% | 100% | +100pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `option-async-chain` — criterion: *"Returns OptionAsync, Promise<Option<T>>, or a Promise of a plain value produced by .match()/.orElse() at the end of the chain, not nested nulls"*
- **BLOCKED** (regression): `option-async-chain` / claude-sonnet-5-5 — *"Returns OptionAsync, Promise<Option<T>>, or a Promise of a plain value produced by .match()/.orElse() at the end of the chain, not nested nulls"*: 100% → 0% (-100pp)
- **BLOCKED** (universal 0%): `either-async-chain` — criterion: *"Runs the sync admin check with .bind() directly on the async Either chain, in the same chain as the .bindAsync() steps (not wrapped in .bindAsync()/Promise.resolve and not after an intermediate await)"*
- **BLOCKED** (universal 0%): `filter-on-async-option` — criterion: *"Chains the plan lookup with .bindAsync() on the same chain, without awaiting or calling .then() between steps"*

**NOT READY**

## 2026-10-31 — utils benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: lookup-key-and-channel-unions *(critical)*

*Write TypeScript: a user lookup endpoint accepts either a numeric user ID or a username; both are equally valid and neither is an error. Model the lookup key as a single value built from the raw query string, then resolve it with byId: Map<number, User> for IDs and fetchByUsername(name): Promise<User | null> for usernames. Separately, a notification is sent through exactly one of three channels (EmailPayload, SmsPayload, PushPayload): model it as one value and render a preview string for each channel.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the lookup key as Union<number, string> built with Union.fromT1()/Union.fromT2(), not as Either or a hand-written tagged union | 0% | 100% | +100pp |
| Resolves the key with the Union's .match() or .matchAsync() (one handler per case) instead of typeof checks | 0% | 100% | +100pp |
| Models the channel as Union3<EmailPayload, SmsPayload, PushPayload> (built with fromT1/fromT2/fromT3) and renders it with a three-handler .match() | 0% | 100% | +100pp |

### Scenario: import-report-list-helpers

*Write TypeScript: a CSV import produced rows: Either<RowError, Customer>[], where RowError has line and reason. Build a report with: the emails of the imported customers that are active, the line numbers of the failed rows, and the total outstanding balance of the imported customers. Balances come from billing.getBalance(customerId): Promise<number>, which is rate-limited, so call it one customer at a time, in order.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Extracts the imported customers with filterRight() (optionally with its predicate) and/or mapRight(), instead of .filter(r => r.isRight()).map(r => r.unwrapRight()) | 0% | 100% | +100pp |
| Collects the failed rows with filterLeft() or the standalone mapLeft(rows, fn) list helper | 0% | 100% | +100pp |
| Sums the balances sequentially with foldAsync(items, 0, async (sum, c) => ...) instead of a for loop or reduce over promises | 0% | 100% | +100pp |

### Scenario: env-config-conversion

*Write TypeScript: load configuration from process.env (values are string | undefined, and an empty string counts as missing). PORT is optional and must be parsed to a number. FEATURE_A, FEATURE_B and FEATURE_C are optional flag names: return the list of the ones that are set, upper-cased. DATABASE_URL is required: when it is missing, return a typed ConfigError { code: 'MISSING_ENV'; name: string } instead of throwing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts the optional env values into Options with toOption() (using its noneWhen and/or map arguments for empty strings and parsing), not with if checks | 0% | 0% | +0pp |
| Converts the required DATABASE_URL with toEither(value, error) (or its map/leftWhen/left form) into an Either with the ConfigError | 0% | 100% | +100pp |
| Collects the set flags with filterSome() and/or mapSome() over an Option list, instead of .filter(o => o.isSome()).map(o => o.unwrap()) | 0% | 100% | +100pp |

### Scenario: checkout-checks-noisy

*Express + Prisma + Redis checkout. Load the customer with prisma.customer.findUnique(...), which resolves to Customer | null; a missing customer is a CheckError { code: 'NO_CUSTOMER' }. Then run three checks against the loaded customer in parallel: creditCheck(c), fraudCheck(c) and addressCheck(c), each returning Promise<Either<CheckError, CheckResult>> where CheckResult has a score. If any check fails, return its error; otherwise return the list of scores.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Turns the nullable async customer lookup into an Either with toEitherAsync(promise, error) (or toOptionAsync(...).toEither(error)) | 0% | 100% | +100pp |
| Runs the three checks in parallel against the customer with bindAllAsync(customerEither, [creditCheck, fraudCheck, addressCheck]) | 0% | 0% | +0pp |
| Combines the check results and extracts the scores in one step with traverseEither(results, r => r.score), using its mapper argument | 0% | 100% | +100pp |

### Scenario: audit-log-paging

*Write TypeScript: fetch every page of an audit-log API with fetchPage(cursor?: string): Promise<{ items: AuditEvent[]; nextCursor?: string }>, starting without a cursor and stopping when there is no next cursor, accumulating all events. Log the size of each page as it arrives, and call alerts.raise(page) only for pages with more than 100 failed-login events. Finally label the export 'large' when there are more than 10000 events and 'small' otherwise. Write it in an expression style, without while loops or if/else statements.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses repeatWhileAsync(init, when, step) (or repeatWhile) to fetch pages until there is no next cursor, instead of a while/for loop or recursion | 0% | 100% | +100pp |
| Logs each page with tee() or teeAsync() while passing it through, and raises the alert with teeWhen() or teeWhenAsync() guarded by the failed-login predicate | 0% | 100% | +100pp |
| Chooses the 'large'/'small' label with which(...) instead of if/else or a ternary | 0% | 0% | +0pp |

### Scenario: resource-cleanup-and-partial-application

*Write TypeScript: import a batch of rows into the database. db.connect() returns a Connection and conn.beginTransaction() returns a Transaction; both have a dispose() method and must always be disposed (transaction first, then connection), even if a query throws. A generic logger log(level: Level, message: string) exists: derive a warn(message) function from it without writing a new wrapper function by hand. After the import, store a summary with cache.save(summary): Promise<boolean>; importBatch must return Promise<Unit> since callers ignore the value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses usingAsync() (the two-resource form usingAsync(conn, c => c.beginTransaction(), (c, tx) => ...) or nested usingAsync/using calls) to guarantee disposal, instead of try/finally | 0% | 100% | +100pp |
| Derives warn with apply(log, 'warn') (or the equivalent level value) | 0% | 100% | +100pp |
| Turns the cache.save promise into Promise<Unit> with toUnitAsync() | 0% | 100% | +100pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `env-config-conversion` — criterion: *"Converts the optional env values into Options with toOption() (using its noneWhen and/or map arguments for empty strings and parsing), not with if checks"*
- **BLOCKED** (universal 0%): `checkout-checks-noisy` — criterion: *"Runs the three checks in parallel against the customer with bindAllAsync(customerEither, [creditCheck, fraudCheck, addressCheck])"*
- **BLOCKED** (universal 0%): `audit-log-paging` — criterion: *"Chooses the 'large'/'small' label with which(...) instead of if/else or a ternary"*

**NOT READY**

## 2026-10-31 — mini-fp benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 1. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: choose-type-per-step *(critical)*

*Write a TypeScript user-registration module with @ngwes/mini-fp: (1) find an existing account by email in a Map<string, Account> (it may not exist); (2) validate the signup form (name, email, password) and report every problem to the user at once; (3) hash the password with a third-party hashPassword(raw) that throws on invalid input; (4) persist the account, where saving can fail with a DUPLICATE or DB_DOWN error and the flow must stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option (not null/undefined) for the account lookup | 100% | 0% | -100pp |
| Uses Validate for the form so all errors are collected, and Either with a typed error for the persistence flow | 0% | 0% | +0pp |
| Uses Try (Try.run, Try.runAsync or TryAsync.runAsync) to wrap the throwing hashPassword call, not a bare try/catch | 0% | 0% | +0pp |

### Scenario: terse-prelude-constructors

*Write small TypeScript helpers with @ngwes/mini-fp: parseAge(raw: string) that fails with a message unless raw is an integer from 0 to 150; firstAdmin(users: User[]) that may find nobody; and checkSku(sku: string) that reports every problem with the SKU (length, prefix, characters) at once. The team's style guide asks for the shortest constructor calls the library offers.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Builds Either values with the plain right()/left() functions imported from '@ngwes/mini-fp' rather than Either.right/Either.left | 0% | 100% | +100pp |
| Builds Option values with the plain some()/none() functions rather than Option.some/Option.none (Option.from or toOption for a nullable value is also fine) | 100% | 100% | +0pp |
| Builds Validate values with the plain valid()/invalid() functions rather than Validate.valid/Validate.invalid | 0% | 100% | +100pp |

### Scenario: payments-module-noisy

*Next.js API route with Prisma and Stripe. A payout can go to a card or to a bank account; both are normal, equally valid destinations (neither is an error). A batch payout produced results: Either<PayoutError, Receipt>[]; respond with the receipt IDs that succeeded and the error codes that failed. The recipient's phone comes from the database as string | null | undefined and must be handled without null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the destination as Union<Card, BankAccount> (not Either and not a hand-written discriminated union) | 100% | 100% | +0pp |
| Extracts receipt IDs and error codes with the list helpers (filterRight/mapRight and filterLeft/mapLeft), not with .filter(isRight).map(unwrapRight) | 0% | 0% | +0pp |
| Converts the nullable phone with toOption() or Option.from() instead of null checks | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `choose-type-per-step` — criterion: *"Uses Option (not null/undefined) for the account lookup"*
- **BLOCKED** (regression): `choose-type-per-step` / claude-sonnet-5-5 — *"Uses Option (not null/undefined) for the account lookup"*: 100% → 0% (-100pp)
- **BLOCKED** (universal 0%): `choose-type-per-step` — criterion: *"Uses Validate for the form so all errors are collected, and Either with a typed error for the persistence flow"*
- **BLOCKED** (universal 0%): `choose-type-per-step` — criterion: *"Uses Try (Try.run, Try.runAsync or TryAsync.runAsync) to wrap the throwing hashPassword call, not a bare try/catch"*
- **BLOCKED** (universal 0%): `payments-module-noisy` — criterion: *"Extracts receipt IDs and error codes with the list helpers (filterRight/mapRight and filterLeft/mapLeft), not with .filter(isRight).map(unwrapRight)"*

**NOT READY**

## 2026-10-31 — option benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() (or the equivalent some()/none()/toOption() functions) instead of null/undefined | 0% | 100% | +100pp |
| Does not return null or undefined directly from the function | 0% | 100% | +100pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 0% | +0pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps (.map() is also acceptable for reading a field that may be undefined, since map turns null/undefined into none) | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 0% | 100% | +100pp |
| The chain stops at the first absent value without explicit branching | 33% | 100% | +67pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 67% | +67pp |
| Uses Option.fromAsync() and/or .bindAsync() for the async optional steps | 0% | 100% | +100pp |
| Produces the 404/success response with .match() or .orElse() on the async Option chain (these return a Promise there), or with .matchAsync()/.orElseAsync() | 0% | 67% | +67pp |

### Scenario: theme-fallback-chain *(critical)*

*Write TypeScript: resolve a user's UI theme. Read it from userSettings (Map<string, string>, keyed by user ID); the stored value may be missing or may be an unsupported string, and only 'light', 'dark' and 'system' are valid. When the user has no valid theme, write a debug log line, then fall back to the organization default from orgSettings (Map<string, string>, same rules: may be missing or invalid). If that also yields nothing, use 'system'. Write it as one chain, without if statements or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary) | 33% | 0% | -33pp |
| Falls back to the organization default with .bindNone() or .mapNone() on the Option chain (not with nested null checks or by unwrapping the first Option) | 0% | 100% | +100pp |
| Logs the debug line with .onNone() (or .onSome() for the found case) inside the chain, and still ends with .orElse('system') or .match() to produce the final string | 0% | 67% | +67pp |

### Scenario: cache-then-db-to-either

*Write TypeScript: get a product by SKU. First look in an in-memory cache (Map<string, Product>); if it is not there, load it from the database with db.findProduct(sku): Promise<Product | null>. Write a debug log whenever a product is found. Return an async result that is either a NotFoundError (which must include the SKU) or the Product, so the HTTP layer can turn it into a 404.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Falls back to the async database load with .bindNoneAsync() or .mapNoneAsync() on the cache Option, instead of an if/else on the cache result | 0% | 33% | +33pp |
| Converts the Option (or OptionAsync) into an Either with its .toEither(...) method, passing a NotFoundError value or factory that includes the SKU | 0% | 100% | +100pp |
| Logs found products with .onSome() in the chain, not with a separate isSome() check or an if | 0% | 0% | +0pp |

### Scenario: loyalty-tier-guards-noisy

*NestJS + TypeORM service. Load a customer's loyalty points from the repository (findPoints(customerId): number | undefined). Map the points to a tier: 10000 or more is 'gold', 5000 or more is 'silver', anything else is 'bronze'. Then pick a coupon for the tier: gold customers get a personal coupon from couponService.personal(customerId): Promise<Coupon>, silver and bronze customers get couponService.standard(tier): Promise<Coupon>. A customer without points gets no coupon. Avoid if/else ladders and nested ternaries; the method returns the coupon as an optional value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardMap() with [when, then] guard pairs (and an otherwise function) to map the points to a tier, instead of if/else or a chain of ternaries | 0% | 100% | +100pp |
| Uses .guardMapAsync() or .guardBindAsync() to choose between the personal and the standard coupon call | 0% | 100% | +100pp |
| Returns an Option/OptionAsync (or a Promise of an Option) for the coupon, never null/undefined, and an absent customer skips the tier and coupon steps | 0% | 67% | +67pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `nullable-lookup` — criterion: *"Uses .match() or .orElse() to handle the absent case at the call site"*
- **BLOCKED** (universal 0%): `theme-fallback-chain` — criterion: *"Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary)"*
- **BLOCKED** (regression): `theme-fallback-chain` / claude-sonnet-5-5 — *"Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary)"*: 33% → 0% (-33pp)
- **BLOCKED** (universal 0%): `cache-then-db-to-either` — criterion: *"Logs found products with .onSome() in the chain, not with a separate isSome() check or an if"*

**NOT READY**

## 2026-10-31 — either benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-error-chain *(critical)*

*Write TypeScript: parse a user ID from a raw string (may not be a valid number), then fetch the user from DB (may not exist). Return a typed error at each step. Stop on the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success (or the equivalent left()/right() functions, or toEither()/Option.toEither() to turn a missing value into a left) | 67% | 100% | +33pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 0% | 100% | +100pp |

### Scenario: map-transform-both-sides *(critical)*

*Write TypeScript: fetch an order from DB using Either. If found, transform the shipping address to uppercase. If not found, transform the NOT_FOUND error into a user-facing message string. Show both transformations.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value, on an Either or directly on an async Either chain | 100% | 100% | +0pp |
| Uses .mapLeft() to transform the left (error) value, on an Either or directly on an async Either chain | 100% | 100% | +0pp |
| Both branches are handled without pattern matching only at the end | 33% | 0% | -33pp |

### Scenario: multi-step-pipeline-noisy

*Express route handler: parse request body JSON, validate required fields, check user permissions in DB (async), save record to DB (async). Each step can fail with a different error. Return the appropriate HTTP status code per error type at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 100% | 100% | +0pp |
| Uses .match() at the end to map error codes to HTTP status codes | 33% | 67% | +34pp |

### Scenario: log-success-and-failure

*Write TypeScript: parse a payment amount from a query-string value into Either<PaymentError, number>, where PaymentError is { code: 'NOT_A_NUMBER' | 'NOT_POSITIVE' | 'TOO_MANY_DECIMALS'; raw: string }. Then convert the amount to integer cents. Log logger.info with the parsed amount when parsing succeeds and logger.warn with the error code when it fails, while still returning the Either<PaymentError, number> in cents to the caller.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .onRight() to log the parsed amount inside the chain | 0% | 100% | +100pp |
| Uses .onLeft() to log the error inside the chain | 0% | 100% | +100pp |
| Returns the Either (converted to cents with .map()) without consuming it with match/unwrap and without an if around the result for the logging | 0% | 33% | +33pp |

### Scenario: shipping-rules-guards

*Write TypeScript: a validator returns Either<OrderError, Order>, where Order has weightKg and destinationCountry. Orders shipped to an embargoed country (a Set<string>) must become an EMBARGOED OrderError; other orders continue. Then choose the shipping method from the weight: over 50 kg is 'freight', over 5 kg is 'parcel', anything else is 'letter'. An invalid order from the validator must keep its original error. Avoid if/else ladders and nested ternaries.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBind() (or .guardBindAsync()) with a [when, then] guard to turn embargoed orders into a Left while other orders stay Right | 0% | 67% | +67pp |
| Uses .guardMap() (or .guardMapAsync()) with [when, then] guards to pick the shipping method from the weight, instead of if/else or nested ternaries | 0% | 67% | +67pp |
| Does not check isLeft()/isRight() manually: the validator's Left passes through the guard steps unchanged | 33% | 33% | +0pp |

### Scenario: refund-routing-async-noisy

*Express + Stripe + PostgreSQL. A refund request has already been validated into Either<RefundError, Refund>. Route it to the right processor: refunds over 1000 EUR go to manualReview.submit(refund), card payments go to stripeRefunds.create(refund), everything else goes to walletRefunds.credit(refund). Each processor returns Promise<Either<RefundError, Receipt>>. Log the receipt ID on success, then send the HTTP response (201 with the receipt, or a status that depends on the error code).*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBindAsync() with [when, then] guard pairs to route the refund to the async processor, instead of if/else or a switch | 0% | 100% | +100pp |
| Logs the receipt with .onRight() on the async Either chain (not after awaiting it in a separate if) | 0% | 67% | +67pp |
| Consumes the result once with .match() or .matchAsync() to send both the success and the error responses | 0% | 100% | +100pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `map-transform-both-sides` — criterion: *"Both branches are handled without pattern matching only at the end"*
- **BLOCKED** (regression): `map-transform-both-sides` / claude-sonnet-5-5 — *"Both branches are handled without pattern matching only at the end"*: 33% → 0% (-33pp)

**NOT READY**

## 2026-10-31 — try benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: wrap-throwing-sync *(critical)*

*Write TypeScript: parse a JSON string that may be malformed. Handle the case where JSON.parse throws. Return a default empty object if parsing fails. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 0% | 100% | +100pp |
| Does not use a bare try/catch block | 67% | 100% | +33pp |
| Uses .onFail() (with a value, a factory, or an error handler) or .match() with a fallback to provide the default value on failure | 67% | 100% | +33pp |

### Scenario: async-exception-boundary *(critical)*

*Write TypeScript: fetch JSON from an external API URL. The fetch may throw (network error) or the .json() parse may throw. Log the error and return a cached fallback value if anything throws. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 0% | 100% | +100pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFail(), .onFailAsync() or .match() on the TryAsync for the error logging and fallback | 0% | 100% | +100pp |

### Scenario: noisy-db-exception

*Prisma + Express app. A database query may throw a connection error or a Prisma-specific error. Write a function that runs the query, logs any thrown error to a logger, and returns null on failure. Also show how to check if the result succeeded.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 0% | 100% | +100pp |
| No bare try/catch block present | 0% | 100% | +100pp |
| Handles the error with .match(), .onFail()/.onFailAsync(), .toEither(), or .isSuccess()/.isFailure() on the awaited Try, without consuming an un-memoized TryAsync more than once (each consumption re-runs the query) | 33% | 0% | -33pp |

### Scenario: config-read-once *(critical)*

*Write TypeScript: read config.json from disk with fs.readFileSync, parse it with JSON.parse and extract its port number (throw if port is not a number). Any of these steps may throw. During startup the result is used several times (to check whether it loaded, to log it, then to start the server), but a successful read must happen only once. Fall back to port 3000 on failure. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Chains the read, the parse and/or the port extraction as separate steps with Try's .map() and/or .bind() (e.g. .bind(raw => Try.run(() => JSON.parse(raw)))) instead of one big closure | 0% | 100% | +100pp |
| Prevents re-reading the file on repeated use: calls .memo() on the Try that is consumed several times (a Try returned by .map()/.bind() also counts, since those results are memoized) | 0% | 100% | +100pp |
| Falls back to 3000 with .onFail(3000), .onFail(() => 3000) or .match(..., 3000), with no try/catch block | 0% | 33% | +33pp |

### Scenario: sdk-session-user-chain *(critical)*

*Write TypeScript: a vendor SDK exposes getSession(token): Promise<Session> and getUser(userId): Promise<User>; both may throw or reject. Load the session, then load the user from session.userId, write an audit entry with audit.record(user.id) once the user is loaded, and return an async result typed as either an error message string or the User. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the SDK calls with TryAsync.runAsync() (or Try.runAsync()) and chains the user load onto the session load with the TryAsync .bind() method | 0% | 100% | +100pp |
| Writes the audit entry with TryAsync's .do() (or with .onRight() after converting to Either), so it is skipped on failure and not placed inside the runAsync callback | 0% | 100% | +100pp |
| Converts the result with .toEither() on the TryAsync and maps the error to a message string with .mapLeft(), with no try/catch block | 0% | 100% | +100pp |

### Scenario: shared-remote-flags-noisy

*Express + node-fetch app with Winston logging. Feature flags are fetched from a remote URL (fetch(url).then(r => r.json()), which may reject or throw). Several middlewares need the flags on every request. Fetch them once and share the result between all middlewares and concurrent requests; if the fetch fails, log the error, use DEFAULT_FLAGS for that request and try fetching again on the next request. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Creates the flags loader with TryAsync.runAsync(...) (or Try.runAsync) followed by .memo(), stored once and reused by the middlewares | 0% | 100% | +100pp |
| Does not hand-roll the caching or the retry (no separate cached-flags variable, promise cache or retry flag besides the memoized TryAsync) | 0% | 100% | +100pp |
| Falls back to DEFAULT_FLAGS and logs the error with .onFail(), .onFailAsync() or .match() on the memoized TryAsync, with no try/catch block | 0% | 67% | +67pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `noisy-db-exception` — criterion: *"Handles the error with .match(), .onFail()/.onFailAsync(), .toEither(), or .isSuccess()/.isFailure() on the awaited Try, without consuming an un-memoized TryAsync more than once (each consumption re-runs the query)"*

**NOT READY**

## 2026-10-31 — validate benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: accumulate-field-errors *(critical)*

*Write TypeScript validators for a signup form: name (required, non-empty), email (must contain @), age (must be >= 18). Run ALL validators and return ALL errors at once, not just the first one.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 0% | 100% | +100pp |
| Uses .combine() to merge results from multiple validators | 0% | 100% | +100pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

### Scenario: dto-typed-errors *(critical)*

*Write a DTO validator for CreateProductDto: name (non-empty string), price (positive number), stock (non-negative integer). Each validator should return a typed FieldError object with a field name and message. Accumulate ALL errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() (or the equivalent valid()/invalid() functions) with typed error objects | 0% | 67% | +67pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 33% | 67% | +34pp |

### Scenario: batch-array-validation

*Write TypeScript: validate an array of numbers where each must be positive and less than 1000. Return ALL numbers that fail with their index and reason. Use sequenceValidate.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

### Scenario: field-errors-to-http-response *(critical)*

*Write TypeScript: existing validators return Validate<string, T> with messages formatted as 'field: reason' (e.g. 'email: must contain @'). For a CreateAccount request (email, password, age), run all the validators and accumulate every error. The HTTP layer needs FieldError objects { field, message } instead of strings. Return { status: 201, body: account } when valid, or { status: 422, body: FieldError[] } listing every error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each string error into a FieldError with .mapInvalid() on the Validate, instead of unwrapInvalid().map(...) inside an isInvalid() branch | 0% | 33% | +33pp |
| Builds both responses with a single .match() on the combined Validate (no isValid()/unwrap() branching) | 0% | 0% | +0pp |
| Accumulates the errors of all fields with .combine() or sequenceValidate | 67% | 100% | +33pp |

### Scenario: recover-optional-field

*Write TypeScript: a profile form has username (required, 3-20 chars) and displayName (optional). validateDisplayName(s) returns Validate<string, string> and fails with 'displayName: empty' for an empty value or with other messages such as 'displayName: too long'. When the only problem is that displayName is empty, use the username as the display name instead of failing; any other displayName errors must still be reported. All errors of all fields must be returned together.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindInvalid() on the displayName Validate to inspect the whole error list and recover with a valid value when the only error is 'empty' | 0% | 100% | +100pp |
| Keeps the other displayName errors invalid (returns the errors from bindInvalid, or does not recover) instead of dropping them | 100% | 100% | +0pp |
| Combines the username and displayName results with .combine() (or sequenceValidate) so errors from both fields are reported together | 0% | 100% | +100pp |

### Scenario: async-save-on-valid-noisy

*Express + Prisma signup route. Validate email and password synchronously, and check that the email is not already taken with an async isEmailTaken(email): Promise<boolean>; report all problems together. When everything is valid, save the user with prisma.user.create(...) and respond 201 with the user; otherwise respond 422 with the list of errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Merges the async uniqueness check with .combineAsync() (or sequenceValidateAsync) so its error is accumulated with the sync errors | 0% | 67% | +67pp |
| Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response | 0% | 0% | +0pp |
| Does not branch on isValid()/isInvalid() or call unwrap()/unwrapInvalid() to build the responses | 0% | 33% | +33pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `field-errors-to-http-response` — criterion: *"Builds both responses with a single .match() on the combined Validate (no isValid()/unwrap() branching)"*
- **BLOCKED** (universal 0%): `async-save-on-valid-noisy` — criterion: *"Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response"*

**NOT READY**

## 2026-10-31 — error-handling benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-pipeline-http *(critical)*

*Write a TypeScript HTTP handler: parse a user ID from request params, fetch the user from DB (async), check the user has admin role. Each step returns a typed AppError with a code field. Map error codes to HTTP status codes at the end. Do not use exceptions.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 33% | 100% | +67pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 0% | 100% | +100pp |
| Uses .match() to map error codes to HTTP status codes at the end | 33% | 33% | +0pp |

### Scenario: wrap-third-party-throws *(critical)*

*A third-party crypto library exposes hash(data: string): string but throws on invalid input. Write a TypeScript wrapper that returns Either<Error, string> instead of throwing. Also show how to use it in a pipeline.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try to Either with .toEither() (typically followed by .mapLeft() to get an Error) or with a single .match(), not by consuming the lazy Try twice (e.g. .isSuccess() then .onFail()) without .memo() | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 33% | 100% | +67pp |

### Scenario: error-fallback-recovery

*Write TypeScript: look up a value from Redis cache (returns Either<'miss', CachedValue>). If cache miss (Left), fall back to a DB query (async, also returns Either<'db_error', DbValue>). If DB also misses, return Left. Show the full fallback chain.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() (or the equivalent left() function) to represent cache miss and DB miss | 33% | 67% | +34pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 0% | 100% | +100pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 67% | -33pp |

### Scenario: nullable-lookups-to-typed-errors *(critical)*

*Write TypeScript: an order-cancellation flow uses a repository whose methods return T | null: findOrder(id), findCustomer(order.customerId) and findPaymentFor(order.id). Each missing record must become a typed AppError { code: 'ORDER_NOT_FOUND' | 'CUSTOMER_NOT_FOUND' | 'PAYMENT_NOT_FOUND'; message: string }, and the flow stops at the first missing record. Do not use exceptions or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each nullable result into an Either with toEither(value, error) or Option.from(value).toEither(error) (value or factory), instead of if/null checks | 33% | 100% | +67pp |
| Uses a typed error with a code field for each missing record | 100% | 67% | -33pp |
| Chains the lookups with .bind() (or .bindAsync()) so later lookups do not run after the first Left | 33% | 100% | +67pp |

### Scenario: void-write-to-either

*Write TypeScript: save a report to disk with fs.writeFileSync(path, contents), which returns nothing and throws on permission or disk errors. Expose saveReport(path, contents) that returns an Either whose error side is AppError { code: 'WRITE_FAILED'; message: string } and whose success side carries no data, so it can be chained with other Either steps. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the write with Try.run() | 0% | 100% | +100pp |
| Maps the void result to Unit.default with Try's .map() before calling .toEither() (toEither throws on an undefined value) | 0% | 100% | +100pp |
| Maps the error to the WRITE_FAILED AppError with .mapLeft() (or builds it in a single .match()), with no try/catch block | 33% | 67% | +34pp |

---

## Release Gate

- **BLOCKED** (regression): `nullable-lookups-to-typed-errors` / claude-sonnet-5-5 — *"Uses a typed error with a code field for each missing record"*: 100% → 67% (-33pp)

**NOT READY**

## 2026-10-31 — validation-patterns benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: form-all-errors *(critical)*

*Write TypeScript validators for a user registration form: username (3-20 chars), email (contains @ and domain), password (min 8 chars, at least one uppercase, one digit). Show ALL errors at once — do not stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 33% | 100% | +67pp |
| Uses .combine() across all field validators to accumulate errors | 33% | 100% | +67pp |
| A test case with all three fields invalid produces three errors, not one | 33% | 0% | -33pp |

### Scenario: typed-field-errors *(critical)*

*Write a DTO validator for UpdateProfileDto: bio (max 500 chars), website (must start with https://). Each error must be a FieldError object with field and message properties. Accumulate errors from both fields.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 0% | 100% | +100pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 33% | 100% | +67pp |

### Scenario: batch-product-validation

*Write TypeScript: validate an array of Product objects where each must have a positive price and non-empty name. Use sequenceValidate. Return the indices and reasons for all invalid products.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `form-all-errors` — criterion: *"A test case with all three fields invalid produces three errors, not one"*
- **BLOCKED** (regression): `form-all-errors` / claude-sonnet-5-5 — *"A test case with all three fields invalid produces three errors, not one"*: 33% → 0% (-33pp)

**NOT READY**

## 2026-10-31 — async-pipelines benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: option-async-chain *(critical)*

*Write TypeScript: validate a bearer token (async, may return null user ID), then load user preferences from DB (async, may not exist), then load their recommended items (async, may not exist). Short-circuit at the first absent value. No nested callbacks or intermediate awaits between chain steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain the async optional steps on Option (the chain may start from Option.from() or Option.fromAsync()) | 33% | 100% | +67pp |
| Does not await or call .then() between chain steps: each step is chained directly on the async Option (an await inside a step's callback is fine) | 0% | 67% | +67pp |
| Returns OptionAsync, Promise<Option<T>>, or a Promise of a plain value produced by .match()/.orElse() at the end of the chain, not nested nulls | 0% | 100% | +100pp |

### Scenario: either-async-chain *(critical)*

*Write TypeScript: authenticate an API token (async, returns Either<ApiError, UserId>), fetch the user (async, returns Either<ApiError, User>), check admin role (sync). Return typed errors at each step. Show consumption with match at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 0% | 100% | +100pp |
| Runs the sync admin check with .bind() directly on the async Either chain, in the same chain as the .bindAsync() steps (not wrapped in .bindAsync()/Promise.resolve and not after an intermediate await) | 0% | 33% | +33pp |
| Uses .match() at consumption point to handle both success and error cases (awaiting chain.match(...) on the async chain, or .match() on the awaited Either) | 67% | 100% | +33pp |

### Scenario: mixed-sync-async-noisy

*Express + Prisma + Redis pipeline: parse raw body (sync), validate schema (sync), check rate limit from Redis (async), save to Prisma (async), publish event to queue (async). Each step can fail. Stop on first failure and return structured error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 0% | 33% | +33pp |
| Does not await between chain steps — stays fluent | 0% | 0% | +0pp |
| Error type propagates consistently through the entire chain | 67% | 67% | +0pp |

### Scenario: filter-on-async-option

*Write TypeScript: load a user's subscription with db.subscriptions.find(userId): Promise<Subscription | null>, ignore it if it has expired (subscription.expiresAt < new Date()), then load its plan with db.plans.find(subscription.planId): Promise<Plan | null>. Return the plan name, or 'free' when any step yields nothing. Keep it as one chain with no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() directly on the async Option chain to drop an expired subscription (not an if inside a bindAsync callback or a separate await) | 0% | 100% | +100pp |
| Chains the plan lookup with .bindAsync() on the same chain, without awaiting or calling .then() between steps | 0% | 0% | +0pp |
| Ends the chain with .orElse('free'), .orElseAsync() or .match() to produce the plan name | 0% | 100% | +100pp |

### Scenario: upstream-call-into-either

*Write TypeScript: call billingApi.getInvoice(id): Promise<Invoice>, which may reject with network or HTTP errors. Turn any failure into an ApiError { code: 'UPSTREAM'; message: string }, then reject unpaid invoices with { code: 'UNPAID' } (sync check), log a warning with the error code whenever the pipeline fails, and return EitherAsync<ApiError, Invoice>. No try/catch and no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the call with TryAsync.runAsync() (or Try.runAsync()) and joins the Either pipeline with .toEither() | 0% | 100% | +100pp |
| Maps the caught error to the ApiError with .mapLeft() and runs the unpaid check with .bind(), both directly on the async Either chain | 0% | 33% | +33pp |
| Logs failures with .onLeft() on the async Either chain instead of awaiting and checking isLeft() | 0% | 33% | +33pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `mixed-sync-async-noisy` — criterion: *"Does not await between chain steps — stays fluent"*
- **BLOCKED** (universal 0%): `filter-on-async-option` — criterion: *"Chains the plan lookup with .bindAsync() on the same chain, without awaiting or calling .then() between steps"*

**NOT READY**

## 2026-10-31 — utils benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: lookup-key-and-channel-unions *(critical)*

*Write TypeScript: a user lookup endpoint accepts either a numeric user ID or a username; both are equally valid and neither is an error. Model the lookup key as a single value built from the raw query string, then resolve it with byId: Map<number, User> for IDs and fetchByUsername(name): Promise<User | null> for usernames. Separately, a notification is sent through exactly one of three channels (EmailPayload, SmsPayload, PushPayload): model it as one value and render a preview string for each channel.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the lookup key as Union<number, string> built with Union.fromT1()/Union.fromT2(), not as Either or a hand-written tagged union | 0% | 100% | +100pp |
| Resolves the key with the Union's .match() or .matchAsync() (one handler per case) instead of typeof checks | 0% | 100% | +100pp |
| Models the channel as Union3<EmailPayload, SmsPayload, PushPayload> (built with fromT1/fromT2/fromT3) and renders it with a three-handler .match() | 0% | 100% | +100pp |

### Scenario: import-report-list-helpers

*Write TypeScript: a CSV import produced rows: Either<RowError, Customer>[], where RowError has line and reason. Build a report with: the emails of the imported customers that are active, the line numbers of the failed rows, and the total outstanding balance of the imported customers. Balances come from billing.getBalance(customerId): Promise<number>, which is rate-limited, so call it one customer at a time, in order.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Extracts the imported customers with filterRight() (optionally with its predicate) and/or mapRight(), instead of .filter(r => r.isRight()).map(r => r.unwrapRight()) | 0% | 100% | +100pp |
| Collects the failed rows with filterLeft() or the standalone mapLeft(rows, fn) list helper | 33% | 100% | +67pp |
| Sums the balances sequentially with foldAsync(items, 0, async (sum, c) => ...) instead of a for loop or reduce over promises | 0% | 100% | +100pp |

### Scenario: env-config-conversion

*Write TypeScript: load configuration from process.env (values are string | undefined, and an empty string counts as missing). PORT is optional and must be parsed to a number. FEATURE_A, FEATURE_B and FEATURE_C are optional flag names: return the list of the ones that are set, upper-cased. DATABASE_URL is required: when it is missing, return a typed ConfigError { code: 'MISSING_ENV'; name: string } instead of throwing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts the optional env values into Options with toOption() (using its noneWhen and/or map arguments for empty strings and parsing), not with if checks | 0% | 67% | +67pp |
| Converts the required DATABASE_URL with toEither(value, error) (or its map/leftWhen/left form) into an Either with the ConfigError | 0% | 100% | +100pp |
| Collects the set flags with filterSome() and/or mapSome() over an Option list, instead of .filter(o => o.isSome()).map(o => o.unwrap()) | 0% | 100% | +100pp |

### Scenario: checkout-checks-noisy

*Express + Prisma + Redis checkout. Load the customer with prisma.customer.findUnique(...), which resolves to Customer | null; a missing customer is a CheckError { code: 'NO_CUSTOMER' }. Then run three checks against the loaded customer in parallel: creditCheck(c), fraudCheck(c) and addressCheck(c), each returning Promise<Either<CheckError, CheckResult>> where CheckResult has a score. If any check fails, return its error; otherwise return the list of scores.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Turns the nullable async customer lookup into an Either with toEitherAsync(promise, error) (or toOptionAsync(...).toEither(error)) | 0% | 67% | +67pp |
| Runs the three checks in parallel against the customer with bindAllAsync(customerEither, [creditCheck, fraudCheck, addressCheck]) | 0% | 33% | +33pp |
| Combines the check results and extracts the scores in one step with traverseEither(results, r => r.score), using its mapper argument | 0% | 100% | +100pp |

### Scenario: audit-log-paging

*Write TypeScript: fetch every page of an audit-log API with fetchPage(cursor?: string): Promise<{ items: AuditEvent[]; nextCursor?: string }>, starting without a cursor and stopping when there is no next cursor, accumulating all events. Log the size of each page as it arrives, and call alerts.raise(page) only for pages with more than 100 failed-login events. Finally label the export 'large' when there are more than 10000 events and 'small' otherwise. Write it in an expression style, without while loops or if/else statements.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses repeatWhileAsync(init, when, step) (or repeatWhile) to fetch pages until there is no next cursor, instead of a while/for loop or recursion | 0% | 0% | +0pp |
| Logs each page with tee() or teeAsync() while passing it through, and raises the alert with teeWhen() or teeWhenAsync() guarded by the failed-login predicate | 0% | 0% | +0pp |
| Chooses the 'large'/'small' label with which(...) instead of if/else or a ternary | 0% | 33% | +33pp |

### Scenario: resource-cleanup-and-partial-application

*Write TypeScript: import a batch of rows into the database. db.connect() returns a Connection and conn.beginTransaction() returns a Transaction; both have a dispose() method and must always be disposed (transaction first, then connection), even if a query throws. A generic logger log(level: Level, message: string) exists: derive a warn(message) function from it without writing a new wrapper function by hand. After the import, store a summary with cache.save(summary): Promise<boolean>; importBatch must return Promise<Unit> since callers ignore the value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses usingAsync() (the two-resource form usingAsync(conn, c => c.beginTransaction(), (c, tx) => ...) or nested usingAsync/using calls) to guarantee disposal, instead of try/finally | 0% | 67% | +67pp |
| Derives warn with apply(log, 'warn') (or the equivalent level value) | 33% | 100% | +67pp |
| Turns the cache.save promise into Promise<Unit> with toUnitAsync() | 0% | 67% | +67pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `audit-log-paging` — criterion: *"Uses repeatWhileAsync(init, when, step) (or repeatWhile) to fetch pages until there is no next cursor, instead of a while/for loop or recursion"*
- **BLOCKED** (universal 0%): `audit-log-paging` — criterion: *"Logs each page with tee() or teeAsync() while passing it through, and raises the alert with teeWhen() or teeWhenAsync() guarded by the failed-login predicate"*

**NOT READY**

## 2026-10-31 — mini-fp benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: one claude-haiku-5-5 call per output, all criteria at once.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: choose-type-per-step *(critical)*

*Write a TypeScript user-registration module with @ngwes/mini-fp: (1) find an existing account by email in a Map<string, Account> (it may not exist); (2) validate the signup form (name, email, password) and report every problem to the user at once; (3) hash the password with a third-party hashPassword(raw) that throws on invalid input; (4) persist the account, where saving can fail with a DUPLICATE or DB_DOWN error and the flow must stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option (not null/undefined) for the account lookup | 100% | 67% | -33pp |
| Uses Validate for the form so all errors are collected, and Either with a typed error for the persistence flow | 33% | 33% | +0pp |
| Uses Try (Try.run, Try.runAsync or TryAsync.runAsync) to wrap the throwing hashPassword call, not a bare try/catch | 0% | 0% | +0pp |

### Scenario: terse-prelude-constructors

*Write small TypeScript helpers with @ngwes/mini-fp: parseAge(raw: string) that fails with a message unless raw is an integer from 0 to 150; firstAdmin(users: User[]) that may find nobody; and checkSku(sku: string) that reports every problem with the SKU (length, prefix, characters) at once. The team's style guide asks for the shortest constructor calls the library offers.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Builds Either values with the plain right()/left() functions imported from '@ngwes/mini-fp' rather than Either.right/Either.left | 100% | 100% | +0pp |
| Builds Option values with the plain some()/none() functions rather than Option.some/Option.none (Option.from or toOption for a nullable value is also fine) | 100% | 100% | +0pp |
| Builds Validate values with the plain valid()/invalid() functions rather than Validate.valid/Validate.invalid | 100% | 67% | -33pp |

### Scenario: payments-module-noisy

*Next.js API route with Prisma and Stripe. A payout can go to a card or to a bank account; both are normal, equally valid destinations (neither is an error). A batch payout produced results: Either<PayoutError, Receipt>[]; respond with the receipt IDs that succeeded and the error codes that failed. The recipient's phone comes from the database as string | null | undefined and must be handled without null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the destination as Union<Card, BankAccount> (not Either and not a hand-written discriminated union) | 0% | 67% | +67pp |
| Extracts receipt IDs and error codes with the list helpers (filterRight/mapRight and filterLeft/mapLeft), not with .filter(isRight).map(unwrapRight) | 0% | 67% | +67pp |
| Converts the nullable phone with toOption() or Option.from() instead of null checks | 33% | 100% | +67pp |

---

## Release Gate

- **BLOCKED** (regression): `choose-type-per-step` / claude-sonnet-5-5 — *"Uses Option (not null/undefined) for the account lookup"*: 100% → 67% (-33pp)
- **BLOCKED** (universal 0%): `choose-type-per-step` — criterion: *"Uses Try (Try.run, Try.runAsync or TryAsync.runAsync) to wrap the throwing hashPassword call, not a bare try/catch"*

**NOT READY**

## 2026-10-31 — option benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() (or the equivalent some()/none()/toOption() functions) instead of null/undefined | 0% | 100% | +100pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 67% | +67pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps (.map() is also acceptable for reading a field that may be undefined, since map turns null/undefined into none) | 0% | 100% | +100pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 100% | 100% | +0pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 100% | +100pp |
| Uses Option.fromAsync() and/or .bindAsync() for the async optional steps | 0% | 100% | +100pp |
| Produces the 404/success response with .match() or .orElse() on the async Option chain (these return a Promise there), or with .matchAsync()/.orElseAsync() | 0% | 100% | +100pp |

### Scenario: theme-fallback-chain *(critical)*

*Write TypeScript: resolve a user's UI theme. Read it from userSettings (Map<string, string>, keyed by user ID); the stored value may be missing or may be an unsupported string, and only 'light', 'dark' and 'system' are valid. When the user has no valid theme, write a debug log line, then fall back to the organization default from orgSettings (Map<string, string>, same rules: may be missing or invalid). If that also yields nothing, use 'system'. Write it as one chain, without if statements or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary) | 100% | 0% | -100pp |
| Falls back to the organization default with .bindNone() or .mapNone() on the Option chain (not with nested null checks or by unwrapping the first Option) | 0% | 100% | +100pp |
| Logs the debug line with .onNone() (or .onSome() for the found case) inside the chain, and still ends with .orElse('system') or .match() to produce the final string | 0% | 100% | +100pp |

### Scenario: cache-then-db-to-either

*Write TypeScript: get a product by SKU. First look in an in-memory cache (Map<string, Product>); if it is not there, load it from the database with db.findProduct(sku): Promise<Product | null>. Write a debug log whenever a product is found. Return an async result that is either a NotFoundError (which must include the SKU) or the Product, so the HTTP layer can turn it into a 404.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Falls back to the async database load with .bindNoneAsync() or .mapNoneAsync() on the cache Option, instead of an if/else on the cache result | 0% | 100% | +100pp |
| Converts the Option (or OptionAsync) into an Either with its .toEither(...) method, passing a NotFoundError value or factory that includes the SKU | 0% | 100% | +100pp |
| Logs found products with .onSome() in the chain, not with a separate isSome() check or an if | 0% | 100% | +100pp |

### Scenario: loyalty-tier-guards-noisy

*NestJS + TypeORM service. Load a customer's loyalty points from the repository (findPoints(customerId): number | undefined). Map the points to a tier: 10000 or more is 'gold', 5000 or more is 'silver', anything else is 'bronze'. Then pick a coupon for the tier: gold customers get a personal coupon from couponService.personal(customerId): Promise<Coupon>, silver and bronze customers get couponService.standard(tier): Promise<Coupon>. A customer without points gets no coupon. Avoid if/else ladders and nested ternaries; the method returns the coupon as an optional value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardMap() with [when, then] guard pairs (and an otherwise function) to map the points to a tier, instead of if/else or a chain of ternaries | 0% | 100% | +100pp |
| Uses .guardMapAsync() or .guardBindAsync() to choose between the personal and the standard coupon call | 0% | 100% | +100pp |
| Returns an Option/OptionAsync (or a Promise of an Option) for the coupon, never null/undefined, and an absent customer skips the tier and coupon steps | 0% | 100% | +100pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `theme-fallback-chain` — criterion: *"Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary)"*
- **BLOCKED** (regression): `theme-fallback-chain` / claude-sonnet-5-5 — *"Uses .filter() on the Option to drop a theme that is not one of the supported values (instead of an if or a ternary)"*: 100% → 0% (-100pp)

**NOT READY**

## 2026-10-31 — either benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-error-chain *(critical)*

*Write TypeScript: parse a user ID from a raw string (may not be a valid number), then fetch the user from DB (may not exist). Return a typed error at each step. Stop on the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() for errors and Either.right() for success (or the equivalent left()/right() functions, or toEither()/Option.toEither() to turn a missing value into a left) | 0% | 100% | +100pp |
| Error type is a typed object or union, not a plain string or any | 100% | 100% | +0pp |
| Uses .bind() or .bindAsync() to chain steps without manual if checks | 0% | 100% | +100pp |

### Scenario: map-transform-both-sides *(critical)*

*Write TypeScript: fetch an order from DB using Either. If found, transform the shipping address to uppercase. If not found, transform the NOT_FOUND error into a user-facing message string. Show both transformations.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .map() to transform the right (success) value, on an Either or directly on an async Either chain | 67% | 100% | +33pp |
| Uses .mapLeft() to transform the left (error) value, on an Either or directly on an async Either chain | 67% | 100% | +33pp |
| Transforms both sides with .map()/.mapLeft() on the Either chain, not inside the handlers of a final .match() | 67% | 100% | +33pp |

### Scenario: multi-step-pipeline-noisy

*Express route handler: parse request body JSON, validate required fields, check user permissions in DB (async), save record to DB (async). Each step can fail with a different error. Return the appropriate HTTP status code per error type at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either pipeline with .bind() for sync steps and .bindAsync() for async steps | 0% | 100% | +100pp |
| Short-circuits: downstream steps do not run after the first Left | 100% | 100% | +0pp |
| Uses .match() at the end to map error codes to HTTP status codes | 0% | 67% | +67pp |

### Scenario: log-success-and-failure

*Write TypeScript: parse a payment amount from a query-string value into Either<PaymentError, number>, where PaymentError is { code: 'NOT_A_NUMBER' | 'NOT_POSITIVE' | 'TOO_MANY_DECIMALS'; raw: string }. Then convert the amount to integer cents. Log logger.info with the parsed amount when parsing succeeds and logger.warn with the error code when it fails, while still returning the Either<PaymentError, number> in cents to the caller.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .onRight() to log the parsed amount inside the chain | 0% | 100% | +100pp |
| Uses .onLeft() to log the error inside the chain | 0% | 100% | +100pp |
| Returns the Either (converted to cents with .map()) without consuming it with match/unwrap and without an if around the result for the logging | 0% | 100% | +100pp |

### Scenario: shipping-rules-guards

*Write TypeScript: a validator returns Either<OrderError, Order>, where Order has weightKg and destinationCountry. Orders shipped to an embargoed country (a Set<string>) must become an EMBARGOED OrderError; other orders continue. Then choose the shipping method from the weight: over 50 kg is 'freight', over 5 kg is 'parcel', anything else is 'letter'. An invalid order from the validator must keep its original error. Avoid if/else ladders and nested ternaries.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBind() (or .guardBindAsync()) with a [when, then] guard to turn embargoed orders into a Left while other orders stay Right | 0% | 100% | +100pp |
| Uses .guardMap() (or .guardMapAsync()) with [when, then] guards to pick the shipping method from the weight, instead of if/else or nested ternaries | 0% | 100% | +100pp |
| Does not check isLeft()/isRight() manually: the validator's Left passes through the guard steps unchanged | 100% | 100% | +0pp |

### Scenario: refund-routing-async-noisy

*Express + Stripe + PostgreSQL. A refund request has already been validated into Either<RefundError, Refund>. Route it to the right processor: refunds over 1000 EUR go to manualReview.submit(refund), card payments go to stripeRefunds.create(refund), everything else goes to walletRefunds.credit(refund). Each processor returns Promise<Either<RefundError, Receipt>>. Log the receipt ID on success, then send the HTTP response (201 with the receipt, or a status that depends on the error code).*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardBindAsync() with [when, then] guard pairs to route the refund to the async processor, instead of if/else or a switch | 0% | 100% | +100pp |
| Logs the receipt with .onRight() on the async Either chain (not after awaiting it in a separate if) | 0% | 100% | +100pp |
| Consumes the result once with .match() or .matchAsync() to send both the success and the error responses | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — try benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: wrap-throwing-sync *(critical)*

*Write TypeScript: parse a JSON string that may be malformed. Handle the case where JSON.parse throws. Return a default empty object if parsing fails. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to wrap the throwing call | 0% | 100% | +100pp |
| Does not use a bare try/catch block | 100% | 100% | +0pp |
| Uses .onFail() (with a value, a factory, or an error handler) or .match() with a fallback to provide the default value on failure | 0% | 100% | +100pp |

### Scenario: async-exception-boundary *(critical)*

*Write TypeScript: fetch JSON from an external API URL. The fetch may throw (network error) or the .json() parse may throw. Log the error and return a cached fallback value if anything throws. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses TryAsync.runAsync() or Try.runAsync() to wrap the async operation | 0% | 100% | +100pp |
| Does not use a bare try/catch around the async code | 100% | 100% | +0pp |
| Uses .onFail(), .onFailAsync() or .match() on the TryAsync for the error logging and fallback | 0% | 100% | +100pp |

### Scenario: noisy-db-exception

*Prisma + Express app. A database query may throw a connection error or a Prisma-specific error. Write a function that runs the query, logs any thrown error to a logger, and returns null on failure. Also show how to check if the result succeeded.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try or TryAsync to capture the thrown error | 0% | 100% | +100pp |
| No bare try/catch block present | 0% | 100% | +100pp |
| Handles the error with .match(), .onFail()/.onFailAsync(), .toEither(), or .isSuccess()/.isFailure() on the awaited Try, without consuming an un-memoized TryAsync more than once (each consumption re-runs the query) (several calls on the awaited Try are fine) | 0% | 100% | +100pp |

### Scenario: config-read-once *(critical)*

*Write TypeScript: read config.json from disk with fs.readFileSync, parse it with JSON.parse and extract its port number (throw if port is not a number). Any of these steps may throw. During startup the result is used several times (to check whether it loaded, to log it, then to start the server), but a successful read must happen only once. Fall back to port 3000 on failure. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Chains the read, the parse and/or the port extraction as separate steps with Try's .map() and/or .bind() (e.g. .bind(raw => Try.run(() => JSON.parse(raw)))) instead of one big closure | 0% | 100% | +100pp |
| Prevents re-reading the file on repeated use: calls .memo() on the Try that is consumed several times (a Try returned by .map()/.bind() also counts, since those results are memoized) | 0% | 100% | +100pp |
| Falls back to 3000 with .onFail(3000), .onFail(() => 3000) or .match(..., 3000), with no try/catch block | 0% | 100% | +100pp |

### Scenario: sdk-session-user-chain *(critical)*

*Write TypeScript: a vendor SDK exposes getSession(token): Promise<Session> and getUser(userId): Promise<User>; both may throw or reject. Load the session, then load the user from session.userId, write an audit entry with audit.record(user.id) once the user is loaded, and return an async result typed as either an error message string or the User. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the SDK calls with TryAsync.runAsync() (or Try.runAsync()) and chains the user load onto the session load with the TryAsync .bind() method | 0% | 100% | +100pp |
| Writes the audit entry with TryAsync's .do() (or with .onRight() after converting to Either), so it is skipped on failure and not placed inside the runAsync callback | 0% | 100% | +100pp |
| Converts the result with .toEither() on the TryAsync and maps the error to a message string with .mapLeft(), with no try/catch block | 0% | 100% | +100pp |

### Scenario: shared-remote-flags-noisy

*Express + node-fetch app with Winston logging. Feature flags are fetched from a remote URL (fetch(url).then(r => r.json()), which may reject or throw). Several middlewares need the flags on every request. Fetch them once and share the result between all middlewares and concurrent requests; if the fetch fails, log the error, use DEFAULT_FLAGS for that request and try fetching again on the next request. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Creates the flags loader with TryAsync.runAsync(...) (or Try.runAsync) followed by .memo(), stored once and reused by the middlewares | 0% | 100% | +100pp |
| Does not hand-roll the caching or the retry (no separate cached-flags variable, promise cache or retry flag besides the memoized TryAsync) | 0% | 100% | +100pp |
| Falls back to DEFAULT_FLAGS and logs the error with .onFail(), .onFailAsync() or .match() on the memoized TryAsync, with no try/catch block | 0% | 100% | +100pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — validate benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: accumulate-field-errors *(critical)*

*Write TypeScript validators for a signup form: name (required, non-empty), email (must contain @), age (must be >= 18). Run ALL validators and return ALL errors at once, not just the first one.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 0% | 100% | +100pp |
| Uses .combine() to merge results from multiple validators | 0% | 0% | +0pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

### Scenario: dto-typed-errors *(critical)*

*Write a DTO validator for CreateProductDto: name (non-empty string), price (positive number), stock (non-negative integer). Each validator should return a typed FieldError object with a field name and message. Accumulate ALL errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() (or the equivalent valid()/invalid() functions) with typed error objects | 0% | 100% | +100pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 0% | 100% | +100pp |

### Scenario: batch-array-validation

*Write TypeScript: validate an array of numbers where each must be positive and less than 1000. Return ALL numbers that fail with their index and reason. Use sequenceValidate.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

### Scenario: field-errors-to-http-response *(critical)*

*Write TypeScript: existing validators return Validate<string, T> with messages formatted as 'field: reason' (e.g. 'email: must contain @'). For a CreateAccount request (email, password, age), run all the validators and accumulate every error. The HTTP layer needs FieldError objects { field, message } instead of strings. Return { status: 201, body: account } when valid, or { status: 422, body: FieldError[] } listing every error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each string error into a FieldError with .mapInvalid() on the Validate, instead of unwrapInvalid().map(...) inside an isInvalid() branch | 0% | 100% | +100pp |
| Builds both responses with a single .match() on the combined Validate (no isValid()/unwrap() branching) | 0% | 100% | +100pp |
| Accumulates the errors of all fields with .combine() or sequenceValidate | 0% | 100% | +100pp |

### Scenario: recover-optional-field

*Write TypeScript: a profile form has username (required, 3-20 chars) and displayName (optional). validateDisplayName(s) returns Validate<string, string> and fails with 'displayName: empty' for an empty value or with other messages such as 'displayName: too long'. When the only problem is that displayName is empty, use the username as the display name instead of failing; any other displayName errors must still be reported. All errors of all fields must be returned together.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindInvalid() on the displayName Validate to inspect the whole error list and recover with a valid value when the only error is 'empty' | 0% | 100% | +100pp |
| Keeps the other displayName errors invalid (returns the errors from bindInvalid, or does not recover) instead of dropping them | 100% | 100% | +0pp |
| Combines the username and displayName results with .combine() (or sequenceValidate) so errors from both fields are reported together | 0% | 100% | +100pp |

### Scenario: async-save-on-valid-noisy

*Express + Prisma signup route. Validate email and password synchronously, and check that the email is not already taken with an async isEmailTaken(email): Promise<boolean>; report all problems together. When everything is valid, save the user with prisma.user.create(...) and respond 201 with the user; otherwise respond 422 with the list of errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Merges the async uniqueness check with .combineAsync() (or sequenceValidateAsync) so its error is accumulated with the sync errors | 0% | 0% | +0pp |
| Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response | 0% | 100% | +100pp |
| Does not branch on isValid()/isInvalid() or call unwrap()/unwrapInvalid() to build the responses | 100% | 100% | +0pp |

---

## Release Gate

- **BLOCKED** (universal 0%): `accumulate-field-errors` — criterion: *"Uses .combine() to merge results from multiple validators"*
- **BLOCKED** (universal 0%): `async-save-on-valid-noisy` — criterion: *"Merges the async uniqueness check with .combineAsync() (or sequenceValidateAsync) so its error is accumulated with the sync errors"*

**NOT READY**

## 2026-10-31 — error-handling benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: typed-pipeline-http *(critical)*

*Write a TypeScript HTTP handler: parse a user ID from request params, fetch the user from DB (async), check the user has admin role. Each step returns a typed AppError with a code field. Map error codes to HTTP status codes at the end. Do not use exceptions.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either with a typed error type that has a code or discriminant field | 100% | 100% | +0pp |
| Uses .bind() / .bindAsync() pipeline instead of try/catch or nested ifs | 0% | 100% | +100pp |
| Uses .match() to map error codes to HTTP status codes at the end | 0% | 100% | +100pp |

### Scenario: wrap-third-party-throws *(critical)*

*A third-party crypto library exposes hash(data: string): string but throws on invalid input. Write a TypeScript wrapper that returns Either<Error, string> instead of throwing. Also show how to use it in a pipeline.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Try.run() to capture the throw from the third-party function | 0% | 100% | +100pp |
| Converts the Try to Either with .toEither() (typically followed by .mapLeft() to get an Error) or with a single .match(), not by consuming the lazy Try twice (e.g. .isSuccess() then .onFail()) without .memo() | 0% | 100% | +100pp |
| No bare try/catch block in the wrapper | 100% | 100% | +0pp |

### Scenario: error-fallback-recovery

*Write TypeScript: look up a value from Redis cache (returns Either<'miss', CachedValue>). If cache miss (Left), fall back to a DB query (async, also returns Either<'db_error', DbValue>). If DB also misses, return Left. Show the full fallback chain.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Either.left() (or the equivalent left() function) to represent cache miss and DB miss | 67% | 67% | +0pp |
| Uses .bindLeftAsync() or .bindLeft() to implement the fallback on Left | 0% | 100% | +100pp |
| Chain stops when the first Right is found (does not always go to DB) | 100% | 100% | +0pp |

### Scenario: nullable-lookups-to-typed-errors *(critical)*

*Write TypeScript: an order-cancellation flow uses a repository whose methods return T | null: findOrder(id), findCustomer(order.customerId) and findPaymentFor(order.id). Each missing record must become a typed AppError { code: 'ORDER_NOT_FOUND' | 'CUSTOMER_NOT_FOUND' | 'PAYMENT_NOT_FOUND'; message: string }, and the flow stops at the first missing record. Do not use exceptions or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each nullable result into an Either with toEither(value, error) or Option.from(value).toEither(error) (value or factory), instead of if/null checks | 0% | 100% | +100pp |
| Uses a typed error with a code field for each missing record | 100% | 100% | +0pp |
| Chains the lookups with .bind() (or .bindAsync()) so later lookups do not run after the first Left | 67% | 100% | +33pp |

### Scenario: void-write-to-either

*Write TypeScript: save a report to disk with fs.writeFileSync(path, contents), which returns nothing and throws on permission or disk errors. Expose saveReport(path, contents) that returns an Either whose error side is AppError { code: 'WRITE_FAILED'; message: string } and whose success side carries no data, so it can be chained with other Either steps. Do not use try/catch.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the write with Try.run() | 0% | 100% | +100pp |
| Maps the void result to Unit.default with Try's .map() before calling .toEither() (toEither throws on an undefined value) | 0% | 100% | +100pp |
| Maps the error to the WRITE_FAILED AppError with .mapLeft() (or builds it in a single .match()), with no try/catch block | 0% | 100% | +100pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — validation-patterns benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: form-all-errors *(critical)*

*Write TypeScript validators for a user registration form: username (3-20 chars), email (contains @ and domain), password (min 8 chars, at least one uppercase, one digit). Show ALL errors at once — do not stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so all field errors are collected | 0% | 100% | +100pp |
| Uses .combine() across all field validators to accumulate errors | 0% | 100% | +100pp |
| Combining three invalid fields returns errors from all three fields, not just the first | 100% | 100% | +0pp |

### Scenario: typed-field-errors *(critical)*

*Write a DTO validator for UpdateProfileDto: bio (max 500 chars), website (must start with https://). Each error must be a FieldError object with field and message properties. Accumulate errors from both fields.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate<FieldError, UpdateProfileDto> with typed error objects | 0% | 100% | +100pp |
| FieldError has both a field name and a message string | 100% | 100% | +0pp |
| Uses .combine() so both field errors are returned if both fail | 0% | 100% | +100pp |

### Scenario: batch-product-validation

*Write TypeScript: validate an array of Product objects where each must have a positive price and non-empty name. Use sequenceValidate. Return the indices and reasons for all invalid products.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to process all products | 100% | 100% | +0pp |
| All invalid products are reported, not just the first | 100% | 100% | +0pp |
| Each error includes which product failed (index or identifier) | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — async-pipelines benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: option-async-chain *(critical)*

*Write TypeScript: validate a bearer token (async, may return null user ID), then load user preferences from DB (async, may not exist), then load their recommended items (async, may not exist). Short-circuit at the first absent value. No nested callbacks or intermediate awaits between chain steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain the async optional steps on Option (the chain may start from Option.from() or Option.fromAsync()) | 0% | 100% | +100pp |
| Does not await or call .then() between chain steps: each step is chained directly on the async Option (an await inside a step's callback is fine) | 100% | 100% | +0pp |
| Returns OptionAsync, Promise<Option<T>>, or a Promise of a plain value produced by .match()/.orElse() at the end of the chain, not nested nulls | 33% | 100% | +67pp |

### Scenario: either-async-chain *(critical)*

*Write TypeScript: authenticate an API token (async, returns Either<ApiError, UserId>), fetch the user (async, returns Either<ApiError, User>), check admin role (sync). Return typed errors at each step. Show consumption with match at the end.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindAsync() to chain async Either steps | 0% | 100% | +100pp |
| Runs the sync admin check with .bind() directly on the async Either chain, in the same chain as the .bindAsync() steps (not wrapped in .bindAsync()/Promise.resolve and not after an intermediate await) | 0% | 100% | +100pp |
| Uses .match() at consumption point to handle both success and error cases (awaiting chain.match(...) on the async chain, or .match() on the awaited Either) | 33% | 100% | +67pp |

### Scenario: mixed-sync-async-noisy

*Express + Prisma + Redis pipeline: parse raw body (sync), validate schema (sync), check rate limit from Redis (async), save to Prisma (async), publish event to queue (async). Each step can fail. Stop on first failure and return structured error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sync .bind() for sync steps and .bindAsync() for async steps in the same chain | 0% | 100% | +100pp |
| Does not await between chain steps — stays fluent | 67% | 100% | +33pp |
| Error type propagates consistently through the entire chain | 100% | 100% | +0pp |

### Scenario: filter-on-async-option

*Write TypeScript: load a user's subscription with db.subscriptions.find(userId): Promise<Subscription | null>, ignore it if it has expired (subscription.expiresAt < new Date()), then load its plan with db.plans.find(subscription.planId): Promise<Plan | null>. Return the plan name, or 'free' when any step yields nothing. Keep it as one chain with no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .filter() directly on the async Option chain to drop an expired subscription (not an if inside a bindAsync callback or a separate await) | 0% | 100% | +100pp |
| Chains the plan lookup with .bindAsync() on the same chain, without awaiting or calling .then() between steps | 0% | 100% | +100pp |
| Ends the chain with .orElse('free'), .orElseAsync() or .match() to produce the plan name | 0% | 100% | +100pp |

### Scenario: upstream-call-into-either

*Write TypeScript: call billingApi.getInvoice(id): Promise<Invoice>, which may reject with network or HTTP errors. Turn any failure into an ApiError { code: 'UPSTREAM'; message: string }, then reject unpaid invoices with { code: 'UNPAID' } (sync check), log a warning with the error code whenever the pipeline fails, and return EitherAsync<ApiError, Invoice>. No try/catch and no awaits between steps.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Wraps the call with TryAsync.runAsync() (or Try.runAsync()) and joins the Either pipeline with .toEither() | 0% | 100% | +100pp |
| Maps the caught error to the ApiError with .mapLeft() and runs the unpaid check with .bind(), both directly on the async Either chain | 0% | 100% | +100pp |
| Logs failures with .onLeft() on the async Either chain instead of awaiting and checking isLeft() | 0% | 100% | +100pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — utils benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: lookup-key-and-channel-unions *(critical)*

*Write TypeScript: a user lookup endpoint accepts either a numeric user ID or a username; both are equally valid and neither is an error. Model the lookup key as a single value built from the raw query string, then resolve it with byId: Map<number, User> for IDs and fetchByUsername(name): Promise<User | null> for usernames. Separately, a notification is sent through exactly one of three channels (EmailPayload, SmsPayload, PushPayload): model it as one value and render a preview string for each channel.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the lookup key as Union<number, string> built with Union.fromT1()/Union.fromT2(), not as Either or a hand-written tagged union | 0% | 100% | +100pp |
| Resolves the key with the Union's .match() or .matchAsync() (one handler per case) instead of typeof checks | 0% | 100% | +100pp |
| Models the channel as Union3<EmailPayload, SmsPayload, PushPayload> (built with fromT1/fromT2/fromT3) and renders it with a three-handler .match() | 0% | 100% | +100pp |

### Scenario: import-report-list-helpers

*Write TypeScript: a CSV import produced rows: Either<RowError, Customer>[], where RowError has line and reason. Build a report with: the emails of the imported customers that are active, the line numbers of the failed rows, and the total outstanding balance of the imported customers. Balances come from billing.getBalance(customerId): Promise<number>, which is rate-limited, so call it one customer at a time, in order.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Extracts the imported customers with filterRight() (optionally with its predicate) and/or mapRight(), instead of .filter(r => r.isRight()).map(r => r.unwrapRight()) | 0% | 100% | +100pp |
| Collects the failed rows with filterLeft() or the standalone mapLeft(rows, fn) list helper | 0% | 100% | +100pp |
| Sums the balances sequentially with foldAsync(items, 0, async (sum, c) => ...) instead of a for loop or reduce over promises | 0% | 100% | +100pp |

### Scenario: env-config-conversion

*Write TypeScript: load configuration from process.env (values are string | undefined, and an empty string counts as missing). PORT is optional and must be parsed to a number. FEATURE_A, FEATURE_B and FEATURE_C are optional flag names: return the list of the ones that are set, upper-cased. DATABASE_URL is required: when it is missing, return a typed ConfigError { code: 'MISSING_ENV'; name: string } instead of throwing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts the optional env values into Options with toOption() (using its noneWhen and/or map arguments for empty strings and parsing), not with if checks | 0% | 67% | +67pp |
| Converts the required DATABASE_URL with toEither(value, error) (or its map/leftWhen/left form) into an Either with the ConfigError | 0% | 100% | +100pp |
| Collects the set flags with filterSome() and/or mapSome() over an Option list, instead of .filter(o => o.isSome()).map(o => o.unwrap()) | 0% | 100% | +100pp |

### Scenario: checkout-checks-noisy

*Express + Prisma + Redis checkout. Load the customer with prisma.customer.findUnique(...), which resolves to Customer | null; a missing customer is a CheckError { code: 'NO_CUSTOMER' }. Then run three checks against the loaded customer in parallel: creditCheck(c), fraudCheck(c) and addressCheck(c), each returning Promise<Either<CheckError, CheckResult>> where CheckResult has a score. If any check fails, return its error; otherwise return the list of scores.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Turns the nullable async customer lookup into an Either with toEitherAsync(promise, error) (or toOptionAsync(...).toEither(error)) | 0% | 100% | +100pp |
| Runs the three checks in parallel against the customer with bindAllAsync(customerEither, [creditCheck, fraudCheck, addressCheck]) | 0% | 100% | +100pp |
| Combines the check results and extracts the scores in one step with traverseEither(results, r => r.score), using its mapper argument | 0% | 100% | +100pp |

### Scenario: audit-log-paging

*Write TypeScript: fetch every page of an audit-log API with fetchPage(cursor?: string): Promise<{ items: AuditEvent[]; nextCursor?: string }>, starting without a cursor and stopping when there is no next cursor, accumulating all events. Log the size of each page as it arrives, and call alerts.raise(page) only for pages with more than 100 failed-login events. Finally label the export 'large' when there are more than 10000 events and 'small' otherwise. Write it in an expression style, without while loops or if/else statements.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses repeatWhileAsync(init, when, step) (or repeatWhile) to fetch pages until there is no next cursor, instead of a while/for loop or recursion | 0% | 100% | +100pp |
| Logs each page with tee() or teeAsync() while passing it through | 0% | 100% | +100pp |
| Raises the alert with teeWhen() or teeWhenAsync() guarded by the failed-login predicate | 0% | 100% | +100pp |
| Chooses the 'large'/'small' label with which(...) instead of if/else or a ternary | 0% | 100% | +100pp |

### Scenario: resource-cleanup-and-partial-application

*Write TypeScript: import a batch of rows into the database. db.connect() returns a Connection and conn.beginTransaction() returns a Transaction; both have a dispose() method and must always be disposed (transaction first, then connection), even if a query throws. A generic logger log(level: Level, message: string) exists: derive a warn(message) function from it without writing a new wrapper function by hand. After the import, store a summary with cache.save(summary): Promise<boolean>; importBatch must return Promise<Unit> since callers ignore the value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses usingAsync() (the two-resource form usingAsync(conn, c => c.beginTransaction(), (c, tx) => ...) or nested usingAsync/using calls) to guarantee disposal, instead of try/finally | 0% | 100% | +100pp |
| Derives warn with apply(log, 'warn') (or the equivalent level value) | 100% | 100% | +0pp |
| Turns the cache.save promise into Promise<Unit> with toUnitAsync() | 0% | 67% | +67pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — mini-fp benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: choose-type-per-step *(critical)*

*Write a TypeScript user-registration module with @ngwes/mini-fp: (1) find an existing account by email in a Map<string, Account> (it may not exist); (2) validate the signup form (name, email, password) and report every problem to the user at once; (3) hash the password with a third-party hashPassword(raw) that throws on invalid input; (4) persist the account, where saving can fail with a DUPLICATE or DB_DOWN error and the flow must stop at the first failure.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option (not null/undefined) for the account lookup | 100% | 100% | +0pp |
| Uses Validate for the form so all errors are collected, and Either with a typed error for the persistence flow | 0% | 100% | +100pp |
| Uses Try (Try.run, Try.runAsync or TryAsync.runAsync) to wrap the throwing hashPassword call, not a bare try/catch | 0% | 100% | +100pp |

### Scenario: terse-prelude-constructors

*Write small TypeScript helpers with @ngwes/mini-fp: parseAge(raw: string) that fails with a message unless raw is an integer from 0 to 150; firstAdmin(users: User[]) that may find nobody; and checkSku(sku: string) that reports every problem with the SKU (length, prefix, characters) at once. The team's style guide asks for the shortest constructor calls the library offers.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Builds Either values with the plain right()/left() functions imported from '@ngwes/mini-fp' rather than Either.right/Either.left | 0% | 100% | +100pp |
| Builds Option values with the plain some()/none() functions rather than Option.some/Option.none (Option.from or toOption for a nullable value is also fine) | 100% | 100% | +0pp |
| Builds Validate values with the plain valid()/invalid() functions rather than Validate.valid/Validate.invalid | 100% | 100% | +0pp |

### Scenario: payments-module-noisy

*Next.js API route with Prisma and Stripe. A payout can go to a card or to a bank account; both are normal, equally valid destinations (neither is an error). A batch payout produced results: Either<PayoutError, Receipt>[]; respond with the receipt IDs that succeeded and the error codes that failed. The recipient's phone comes from the database as string | null | undefined and must be handled without null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Models the destination as Union<Card, BankAccount> (not Either and not a hand-written discriminated union) | 0% | 100% | +100pp |
| Extracts receipt IDs and error codes with the list helpers (filterRight/mapRight and filterLeft/mapLeft), not with .filter(isRight).map(unwrapRight) | 0% | 100% | +100pp |
| Converts the nullable phone with toOption() or Option.from() instead of null checks | 0% | 67% | +67pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — option benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: nullable-lookup *(critical)*

*Write a TypeScript function that looks up a user by ID from a Map<string, User>. Handle the case where the user doesn't exist. Do not return null or undefined.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option.from(), Option.some(), or Option.none() (or the equivalent some()/none()/toOption() functions) instead of null/undefined | 0% | 100% | +100pp |
| Does not return null or undefined directly from the function | 100% | 100% | +0pp |
| Uses .match() or .orElse() to handle the absent case at the call site | 0% | 100% | +100pp |

### Scenario: chain-optional-steps *(critical)*

*Write TypeScript: given a user ID, get the user from a cache (Map<string, User>), then get their profile (Map<string, Profile>), then get their avatar URL (profile.avatarUrl may be undefined). Each step may return nothing. Chain these safely without nested null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bind() or .bindAsync() to chain optional steps (.map() is also acceptable for reading a field that may be undefined, since map turns null/undefined into none) | 33% | 100% | +67pp |
| Does not use nested if/null checks between steps | 100% | 100% | +0pp |
| The chain stops at the first absent value without explicit branching | 33% | 100% | +67pp |

### Scenario: async-nullable-noisy-context

*Express + Redis + Prisma app. Write an async function that gets a session token from Redis (returns string | null), validates it to get a user ID (async, may return null), then loads the user from Prisma (may return null). Return a 404 response if any step returns nothing.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Option for absent values instead of null checks | 0% | 100% | +100pp |
| Uses Option.fromAsync() and/or .bindAsync() for the async optional steps | 0% | 100% | +100pp |
| Produces the 404/success response with .match() or .orElse() on the async Option chain (these return a Promise there), or with .matchAsync()/.orElseAsync() | 0% | 67% | +67pp |

### Scenario: theme-fallback-chain *(critical)*

*Write TypeScript: resolve a user's UI theme. Read it from userSettings (Map<string, string>, keyed by user ID); the stored value may be missing or may be an unsupported string, and only 'light', 'dark' and 'system' are valid. When the user has no valid theme, write a debug log line, then fall back to the organization default from orgSettings (Map<string, string>, same rules: may be missing or invalid). If that also yields nothing, use 'system'. Write it as one chain, without if statements or null checks.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Drops a theme that is not one of the supported values with .filter() on the Option or with the noneWhen predicate of Option.from(value, noneWhen) (instead of an if or a ternary) | 100% | 100% | +0pp |
| Falls back to the organization default with .bindNone() or .mapNone() on the Option chain (not with nested null checks or by unwrapping the first Option) | 0% | 100% | +100pp |
| Logs the debug line with .onNone() (or .onSome() for the found case) inside the chain, and still ends with .orElse('system') or .match() to produce the final string | 0% | 100% | +100pp |

### Scenario: cache-then-db-to-either

*Write TypeScript: get a product by SKU. First look in an in-memory cache (Map<string, Product>); if it is not there, load it from the database with db.findProduct(sku): Promise<Product | null>. Write a debug log whenever a product is found. Return an async result that is either a NotFoundError (which must include the SKU) or the Product, so the HTTP layer can turn it into a 404.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Falls back to the async database load with .bindNoneAsync() or .mapNoneAsync() on the cache Option, instead of an if/else on the cache result | 0% | 100% | +100pp |
| Converts the Option (or OptionAsync) into an Either with its .toEither(...) method, passing a NotFoundError value or factory that includes the SKU | 0% | 100% | +100pp |
| Logs found products with .onSome() in the chain, not with a separate isSome() check or an if | 0% | 100% | +100pp |

### Scenario: loyalty-tier-guards-noisy

*NestJS + TypeORM service. Load a customer's loyalty points from the repository (findPoints(customerId): number | undefined). Map the points to a tier: 10000 or more is 'gold', 5000 or more is 'silver', anything else is 'bronze'. Then pick a coupon for the tier: gold customers get a personal coupon from couponService.personal(customerId): Promise<Coupon>, silver and bronze customers get couponService.standard(tier): Promise<Coupon>. A customer without points gets no coupon. Avoid if/else ladders and nested ternaries; the method returns the coupon as an optional value.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .guardMap() with [when, then] guard pairs (and an otherwise function) to map the points to a tier, instead of if/else or a chain of ternaries | 0% | 100% | +100pp |
| Uses .guardMapAsync() or .guardBindAsync() to choose between the personal and the standard coupon call | 0% | 100% | +100pp |
| Returns an Option/OptionAsync (or a Promise of an Option) for the coupon, never null/undefined, and an absent customer skips the tier and coupon steps | 67% | 100% | +33pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

## 2026-10-31 — validate benchmark

Method: automated eval via isolated `claude -p` (no settings, MCP, skills or tools). Models: claude-sonnet-5-5. Reps: 3. Grading: 3 independent claude-haiku-5-5 calls per output, each judging the main solution on all criteria at once; majority vote per criterion.
Note: "with skill" injects SKILL.md content as library context in the user prompt.

### Scenario: accumulate-field-errors *(critical)*

*Write TypeScript validators for a signup form: name (required, non-empty), email (must contain @), age (must be >= 18). Run ALL validators and return ALL errors at once, not just the first one.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate (not Either) so errors accumulate instead of short-circuiting | 0% | 100% | +100pp |
| Merges the results of the validators with .combine() or sequenceValidate | 0% | 100% | +100pp |
| Returns all errors, not just the first one that fails | 100% | 100% | +0pp |

### Scenario: dto-typed-errors *(critical)*

*Write a DTO validator for CreateProductDto: name (non-empty string), price (positive number), stock (non-negative integer). Each validator should return a typed FieldError object with a field name and message. Accumulate ALL errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses Validate.valid() and Validate.invalid() (or the equivalent valid()/invalid() functions) with typed error objects | 0% | 100% | +100pp |
| Error type includes a field name (not just a plain string) | 100% | 100% | +0pp |
| Uses .combine() or sequenceValidate to collect all errors from all fields | 0% | 100% | +100pp |

### Scenario: batch-array-validation

*Write TypeScript: validate an array of numbers where each must be positive and less than 1000. Return ALL numbers that fail with their index and reason. Use sequenceValidate.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses sequenceValidate to validate all items | 100% | 100% | +0pp |
| Does not short-circuit: all items are validated even after the first failure | 100% | 100% | +0pp |
| Returns errors from all failing items, not just the first | 100% | 100% | +0pp |

### Scenario: field-errors-to-http-response *(critical)*

*Write TypeScript: existing validators return Validate<string, T> with messages formatted as 'field: reason' (e.g. 'email: must contain @'). For a CreateAccount request (email, password, age), run all the validators and accumulate every error. The HTTP layer needs FieldError objects { field, message } instead of strings. Return { status: 201, body: account } when valid, or { status: 422, body: FieldError[] } listing every error.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Converts each string error into a FieldError with .mapInvalid() on the Validate, instead of unwrapInvalid().map(...) inside an isInvalid() branch | 0% | 100% | +100pp |
| Builds both responses with a single .match() on the combined Validate (no isValid()/unwrap() branching) | 0% | 100% | +100pp |
| Accumulates the errors of all fields with .combine() or sequenceValidate | 0% | 100% | +100pp |

### Scenario: recover-optional-field

*Write TypeScript: a profile form has username (required, 3-20 chars) and displayName (optional). validateDisplayName(s) returns Validate<string, string> and fails with 'displayName: empty' for an empty value or with other messages such as 'displayName: too long'. When the only problem is that displayName is empty, use the username as the display name instead of failing; any other displayName errors must still be reported. All errors of all fields must be returned together.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Uses .bindInvalid() on the displayName Validate to inspect the whole error list and recover with a valid value when the only error is 'empty' | 0% | 100% | +100pp |
| Keeps the other displayName errors invalid (returns the errors from bindInvalid, or does not recover) instead of dropping them | 100% | 100% | +0pp |
| Combines the username and displayName results with .combine() (or sequenceValidate) so errors from both fields are reported together | 0% | 100% | +100pp |

### Scenario: async-save-on-valid-noisy

*Express + Prisma signup route. Validate email and password synchronously, and check that the email is not already taken with an async isEmailTaken(email): Promise<boolean>; report all problems together. When everything is valid, save the user with prisma.user.create(...) and respond 201 with the user; otherwise respond 422 with the list of errors.*

**claude-sonnet-5-5**

| Criterion | Baseline | With skill | Delta |
|-----------|----------|------------|-------|
| Accumulates the async uniqueness error with the sync errors, via .combineAsync()/sequenceValidateAsync or by awaiting the check and merging its Validate with .combine()/sequenceValidate | 0% | 100% | +100pp |
| Uses .matchAsync() with an async valid handler that saves the user, and an invalid handler that builds the 422 response | 0% | 100% | +100pp |
| Does not branch on isValid()/isInvalid() or call unwrap()/unwrapInvalid() to build the responses | 100% | 100% | +0pp |

---

## Release Gate

**READY** — No universal 0% criteria. No critical regressions.

