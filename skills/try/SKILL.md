---
name: try
description: API reference for Try<T> and TryAsync<T> from @ngwes/mini-fp.
---

## Try\<T\>

Wraps a computation that may throw. Captures the exception instead of propagating it. **Lazy:** `Try.run(fn)` does not call `fn` — it runs each time the `Try` is consumed (`isSuccess`, `isFailure`, `match`, `onFail`, `onFailAsync`, `toEither`).

```typescript
import { Try } from '@ngwes/mini-fp';
```

### Constructors

```typescript
Try.run(() => JSON.parse(raw))          // Try<T>      — sync, nothing runs yet
Try.runAsync(() => fetch(url).then(…))  // TryAsync<T> — async, catches throws and rejections
```

### State, memo, transform

```typescript
t.isSuccess()  // runs fn — true if no exception was thrown
t.isFailure()  // runs fn — true if exception was caught
t.memo()       // Try<T> that keeps the first SUCCESS; a failure is retried on next consumption

Try.run(() => '42').map(s => Number(s))           // Try<number> — throw inside fn → failure
Try.run(() => readFileSync(path, 'utf-8'))
  .bind(raw => Try.run(() => JSON.parse(raw)))    // Try<U> — chain another Try
// map/bind results are memoized like memo()
```

### Consume

```typescript
t.match(value => `got ${value}`, err => `failed: ${err}`)
t.match(n => n, 0)                    // onFail may be a plain value

t.onFail(0)                           // T — value fallback
t.onFail(() => computeDefault())      // zero-arg factory, only called on failure
t.onFail(err => { log(err); return -1; })

await t.onFailAsync(async err => {    // accepts any PromiseLike<T>
  await logError(err);
  return fallbackValue;
})

t.toEither()                          // Either<unknown, T> — right(value) / left(thrown error)
Try.run(() => JSON.parse(raw)).toEither().mapLeft(e => (e as Error).message)
```

---

## TryAsync\<T\>

Lazy async counterpart: nothing runs until it is consumed (`await`, `match`, `onFail`, `onFailAsync`, `toEither`). `Try.runAsync` and `TryAsync.runAsync` are equivalent entry points.

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const config = TryAsync.runAsync(() => fetchConfig()).memo(); // keeps first success; pending runs are shared

TryAsync.runAsync(() => fetchSession())
  .bind(s => TryAsync.runAsync(() => fetchUser(s.userId)))  // chain another TryAsync (memoized)
  .do(u => console.log('loaded', u.id))                     // side effect, skipped on failure
```

### Consume

```typescript
// ta: TryAsync<T>
await ta.match(async n => n * 2, 0)                 // Promise<U>; handlers sync or async
await ta.onFail(async err => { await logError(err); return fallbackData; })  // Promise<T>
await TryAsync.runAsync(() => fetchRemote())
  .onFailAsync(async err => { await logError(err); return fallbackData; })   // PromiseLike<T>
await ta.toEither().mapLeft(e => (e as Error).message)  // EitherAsync<unknown, T>

// when T is Either<L, R>: handler returning PromiseLike<Either<L, R>> → EitherAsync<L, R>
const te: TryAsync<Either<Error, number>> = TryAsync.runAsync(async () => Either.right<Error, number>(1));
await te.onFailAsync(e => asTask(Either.left<Error, number>(e as Error))).map(n => n * 2)  // right(2)
```

### Await the underlying Try\<T\>

`TryAsync<T>` implements `PromiseLike<Try<T>>` — `await` runs it once and resolves to an evaluated `Try<T>` that holds the outcome. Calling several methods on that `Try` does not re-run the work:

```typescript
const t = await TryAsync.runAsync(() => fetchRemote());  // fetchRemote runs here, once
t.isSuccess();                                           // reads the stored outcome
t.match(data => data, null);                             // no re-run either
```

---

## Gotchas

- **Laziness:** on a lazy `Try` (from `Try.run`) or `TryAsync`, every consumption re-runs the function unless you call `memo()`. `t.isSuccess()` then `t.onFail(x)` runs it twice — call `.memo()` for side-effecting or expensive work. This does not apply to the `Try` you get from `await tryAsync`: it is already evaluated, so several calls on it are fine.
- **`memo()` keeps successes only:** a failure is not cached, so the next consumption retries the function.
- `toEither()` throws (rejects for `TryAsync`) when the value or the thrown error is `null`/`undefined`. For `Try<void>`, map first: `.map(() => Unit.default).toEither()`.
- `onFailAsync` accepts any `PromiseLike<T>` — including `EitherAsync<L, T>` when `T` is `Either<L, R>`.
