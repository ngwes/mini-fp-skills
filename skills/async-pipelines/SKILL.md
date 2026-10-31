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

## Recipe: Lazy TryAsync chain with bind, do and memo

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const loadUser = TryAsync.runAsync(() => fetchSession())      // nothing runs yet
  .bind(s => TryAsync.runAsync(() => fetchUser(s.userId)))   // chain another TryAsync
  .do(u => audit.log('login', u.id));                        // side effect, awaited; skipped on failure

const name = await loadUser.match(u => u.name, 'anonymous'); // runs the chain now

const config = TryAsync.runAsync(() => fetchConfig()).memo();
await config.onFail(defaults);   // calls fetchConfig
await config.onFail(defaults);   // reuses the first success; after a failure, calls it again
```

Each consumption (`await`, `match`, `onFail`, `toEither`) re-runs a lazy `TryAsync`. The `Try` that `await` resolves to is already evaluated, so calling several methods on it (`const t = await ta; t.isFailure(); t.match(…)`) does not re-run anything. Call `memo()` when you consume it more than once and the work is expensive or has side effects. It caches successes only, so a failure is retried on the next consumption. A `throw` or rejection inside `do` is a failure. `bind` results are already memoized, but `do` is not, so its action runs on every consumption.

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
- `TryAsync` is lazy — nothing runs until awaited or consumed. It has `memo`, `bind`, `do`, `match`, `onFail`, `onFailAsync`, `toEither` (no `map`); use `toEither()` to join an Either pipeline.

---
