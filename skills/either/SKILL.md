---
name: either
description: API reference for Either<L, R> and EitherAsync<L, R> from @ngwes/mini-fp.
---

## Either\<L, R\>

Right-biased. `right` = success, `left` = error. Short-circuits on first `left`.

```typescript
import { Either } from '@ngwes/mini-fp';
// prelude: import { right, left } from '@ngwes/mini-fp' — same as Either.right / Either.left
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

### Transform and side effects

```typescript
e.map(x => x * 2)                // Either<L, U> — transforms right, passes left through
e.mapLeft(err => wrap(err))      // Either<U, R> — transforms left, passes right through
e.mapAsync(async x => …)         // EitherAsync<L, U>
e.mapLeftAsync(async err => …)   // EitherAsync<U, R>
e.onRight(x => log(x))           // runs on right, returns the same Either
e.onLeft(err => warn(err))       // runs on left, returns the same Either
```

### Chain

```typescript
e.bind(x => parseAge(x))         // Either<L, U> — chains on right, short-circuits on left
e.bindLeft(err => recover(err))  // Either<U, R> — chains on left, short-circuits on right
```

### Guards

```typescript
// Guard<R, U> = [when, then]: the first guard whose `when` holds wins, else `otherwise`
e.guardMap(x => 'small', [x => x > 3, () => 'large'])           // left is kept, no guard runs
e.guardBind(x => Either.right('ok'), [x => x > 3, () => Either.left('too large')])
// onLeft overload: handle the left too, both sides move to a new Either<A, B>
e.guardBind(err => Either.right(`recovered: ${err}`), x => Either.right(String(x)))
// guardMapAsync / guardBindAsync take async functions → EitherAsync (only guardBindAsync has the onLeft overload)
```

### Pattern match

```typescript
e.match(
  value => `ok: ${value}`,
  error => `err: ${error}`
)
await e.matchAsync(
  async value => ({ status: 200, data: value }),
  error       => ({ status: 500, data: error })   // handlers may be sync or async
)
```

---

## EitherAsync\<L, R\>

Returned by `mapAsync`, `mapLeftAsync`, `bindAsync`, `bindLeftAsync`, `guardMapAsync` and `guardBindAsync`. Wraps `Promise<Either<L, R>>`, implements `PromiseLike` and **mirrors the `Either` API** (`map`, `mapLeft`, `bind`, `bindLeft`, `onRight`, `onLeft`, `guardMap`, `guardBind`, their `Async` variants, `match`, `matchAsync`).

```typescript
import { EitherAsync } from '@ngwes/mini-fp';

EitherAsync.from(promise)    // wrap existing PromiseLike<Either<L, R>>
EitherAsync.right<L, R>(v)   // already-resolved right
EitherAsync.left<L, R>(v)    // already-resolved left
```

### Chain sync and async steps — no `.then()`

```typescript
const result = await Either.right<ApiError, string>('user-1')
  .bindAsync(id   => fetchUser(id))        // Promise<Either> or EitherAsync
  .bind(requireAdmin)                       // sync step on the EitherAsync
  .onLeft(error   => logger.warn(error.message))
  .bindAsync(user => fetchPermissions(user));

// bindLeftAsync — chain on left (error recovery)
await Either.left<string, number>('not_found')
  .bindLeftAsync(code => fallbackLookup(code))

.bindAsync(existingPromise)  // also accepts a PromiseLike<Either<L, U>> directly
```

On an `EitherAsync`, `match` and `matchAsync` return a `Promise` of the plain value.

---

## Gotchas

- `Either.right(null)` → throws. Wrap nullable values before creating Either (`Option.from(v).toEither(err)`).
- `unwrapRight()` on left → throws. Check `isRight()` or use `match`.
- `bind` operates on the **right** side. Use `bindLeft` to chain on errors.
- `mapAsync`/`bindAsync` return `EitherAsync`, not `Promise` — keep chaining on it and `await` once at the end.
- For already-async entry points, prefer `EitherAsync.right(v)` over `Either.right(v).bindAsync(...)`.
