---
name: ngwes/mini-fp:try
description: API reference for Try<T> and TryAsync<T> from @ngwes/mini-fp.
---

## Try\<T\>

Wraps a computation that may throw. Captures the exception instead of propagating it.

```typescript
import { Try } from '@ngwes/mini-fp';
```

### Constructors

```typescript
Try.run(() => JSON.parse(raw))          // Try<T>      — sync, catches throws
Try.runAsync(() => fetch(url).then(…))  // TryAsync<T> — async, catches throws and rejections
```

### State

```typescript
t.isSuccess()  // true if no exception was thrown
t.isFailure()  // true if exception was caught
```

### Recover

```typescript
// onFail — sync recovery, returns T
t.onFail(err => defaultValue)

// onFailAsync — async recovery, accepts any PromiseLike<T>
await t.onFailAsync(async err => {
  await logError(err);
  return fallbackValue;
})
```

---

## TryAsync\<T\>

Fluent async wrapper. `Try.runAsync` and `TryAsync.runAsync` are equivalent entry points.

```typescript
import { TryAsync } from '@ngwes/mini-fp';
```

### Constructors

```typescript
TryAsync.runAsync(() => fetch(url).then(r => r.json()))  // TryAsync<T>
// equivalent:
Try.runAsync(() => fetch(url).then(r => r.json()))       // also TryAsync<T>
```

### Recover

```typescript
const data = await TryAsync.runAsync(() => fetchRemote())
  .onFailAsync(async err => {
    await logError(err);
    return fallbackData;
  });
```

### Await the underlying Try\<T\>

`TryAsync<T>` implements `PromiseLike<Try<T>>` — `await` resolves to `Try<T>`:

```typescript
const t = await TryAsync.runAsync(() => fetchRemote());
t.isSuccess(); // inspect manually
```

---

## Gotchas

- `onFailAsync` accepts any `PromiseLike<T>` — including `EitherAsync<L, T>` when `T` is `Either<L, R>`.
- `Try<T>` has no `map`/`bind`. Inspect with `isSuccess()` and call `onFail`/`onFailAsync`.
- Prefer `TryAsync.runAsync` for fluent `.onFailAsync()` chains over awaiting `Try.runAsync` manually.
