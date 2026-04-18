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

