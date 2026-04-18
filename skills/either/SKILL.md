---
name: either
description: API reference for Either<L, R> and EitherAsync<L, R> from @ngwes/mini-fp.
---

## Either\<L, R\>

Right-biased. `right` = success, `left` = error. Short-circuits on first `left`.

```typescript
import { Either } from '@ngwes/mini-fp';
```

### Constructors

```typescript
Either.right<L, R>(value)  // success — throws if null/undefined
Either.left<L, R>(value)   // error   — throws if null/undefined
```

### State

```typescript
e.isRight()      // true if success
e.isLeft()       // true if error
e.unwrapRight()  // returns right value — throws if left
e.unwrapLeft()   // returns left value  — throws if right
```

### Transform

```typescript
e.map(x => x * 2)            // Either<L, U> — transforms right, passes left through
e.mapLeft(err => wrap(err))   // Either<U, R> — transforms left, passes right through
await e.mapAsync(async x => …)        // Promise<Either<L, U>>
await e.mapLeftAsync(async err => …)  // Promise<Either<U, R>>
```

### Chain

```typescript
e.bind(x => parseAge(x))         // Either<L, U> — chains on right, short-circuits on left
e.bindLeft(err => recover(err))  // Either<U, R> — chains on left, short-circuits on right
```

### Pattern match

```typescript
e.match(
  value => `ok: ${value}`,
  error => `err: ${error}`
)
await e.matchAsync(
  async value => ({ status: 200, data: value }),
  async error => ({ status: 500, data: error })
)
```

---

## EitherAsync\<L, R\>

Returned by `e.bindAsync(...)` and `e.bindLeftAsync(...)`. Chainable and awaitable.

```typescript
import { EitherAsync } from '@ngwes/mini-fp';
```

### Entry points

```typescript
EitherAsync.from(promise)    // wrap existing Promise<Either<L, R>>
EitherAsync.right<L, R>(v)  // already-resolved right
EitherAsync.left<L, R>(v)   // already-resolved left
```

### Chain

```typescript
// bindAsync — chain on right side
await Either.right<ApiError, string>('user-1')
  .bindAsync(id   => fetchUser(id))
  .bindAsync(user => fetchPermissions(user))

// bindLeftAsync — chain on left (error recovery)
await Either.left<string, number>('not_found')
  .bindLeftAsync(code => fallbackLookup(code))

// Also accepts EitherAsync directly
.bindAsync(id => EitherAsync.from(fetchUser(id)))

// Also accepts a Promise<Either<L, U>> directly
.bindAsync(existingPromise)
```

---

## Gotchas

- `Either.right(null)` → throws. Wrap nullable values before creating Either.
- `unwrapRight()` on left → throws. Check `isRight()` or use `match`.
- `bind` operates on the **right** side. Use `bindLeft` to chain on errors.
- `bindAsync` returns `EitherAsync`, not `Promise` — but `await` works.
- For already-async entry points, prefer `EitherAsync.right(v)` over `Either.right(v).bindAsync(...)`.
