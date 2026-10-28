---
name: async-pipelines
description: Pattern guide for chaining async operations with Option, Either, and Try from @ngwes/mini-fp.
---

## Problem

Chain multiple async steps where each may fail or return nothing, without nested `.then()` callbacks or try/catch pyramids.

---

## Recipe: Option async chain

```typescript
import { Option } from '@ngwes/mini-fp';

const getRecommendations = (token: string | null): Promise<string[]> =>
  Option.from(token)
    .bindAsync(async t  => Option.from(await auth.validate(t)))
    .bindAsync(id       => Option.fromAsync(db.preferences.find(id)))
    .map(prefs          => prefs.topics)
    .orElseAsync(() => recommendations.trending());   // no .then() — OptionAsync has orElseAsync
```

---

## Recipe: Either async chain

```typescript
import { Either } from '@ngwes/mini-fp';

type ApiError = { code: string; message: string };

const handle = (token: string) =>                    // EitherAsync<ApiError, User>
  Either.right<ApiError, string>(token)
    .bindAsync(t    => authenticate(t))
    .bindAsync(id   => fetchUser(id))
    .bind(requireAdmin)                              // sync step, still on EitherAsync
    .onLeft(error   => logger.warn(error.code));

await handle('my-token').match(
  user  => console.log('ok', user),
  error => console.error(error.code, error.message)
);
```

---

## Recipe: Mix sync and async steps

```typescript
import { Either } from '@ngwes/mini-fp';

await Either.right<string, string>(rawInput)
  .bind(parseFormat)
  .bind(validate)
  .bindAsync(input  => saveToDb(input))
  .map(record       => record.id)
  .bindAsync(id     => notify(id));
```

---

## Recipe: TryAsync for async exception boundaries

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const data = await TryAsync.runAsync(() => fetch(url).then(r => r.json()))
  .onFail(async err => {
    await logger.error(err);
    return cachedData;
  });

// Into an Either pipeline
const user = await TryAsync.runAsync(() => api.getUser(id))
  .toEither()                                         // EitherAsync<unknown, User>
  .mapLeft(e => ({ code: 'UPSTREAM', message: String(e) }))
  .bind(requireAdmin);
```

---

## Recipe: EitherAsync as direct entry point

```typescript
import { EitherAsync } from '@ngwes/mini-fp';

const result = await EitherAsync.right<string, number>(42)
  .bindAsync(n => someAsyncOp(n));
```

---

## Key rules

- `mapAsync`/`bindAsync` (and `Option.fromAsync`) return `OptionAsync`/`EitherAsync` — both implement `PromiseLike`, so `await` works directly.
- `OptionAsync`/`EitherAsync` mirror the sync API: chain `.map()`, `.bind()`, `.filter()`, `.onLeft()`, … on them — no `.then()`, no await between steps. `await` once at the end.
- `match`/`orElse` on an async wrapper return a `Promise` of the plain value.
- `TryAsync` is lazy — nothing runs until awaited or consumed. It has `bind`, `do`, `match`, `onFail`, `toEither` (no `map`); use `toEither()` to join an Either pipeline.

---
