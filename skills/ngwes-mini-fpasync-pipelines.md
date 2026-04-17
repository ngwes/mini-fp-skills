---
name: ngwes/mini-fp:async-pipelines
description: Pattern guide for chaining async operations with Option, Either, and Try from @ngwes/mini-fp.
---

## Problem

Chain multiple async steps where each may fail or return nothing, without nested `.then()` callbacks or try/catch pyramids.

---

## Recipe: Option async chain

```typescript
import { Option } from '@ngwes/mini-fp';

const getRecommendations = async (token: string | null): Promise<string[]> =>
  Option.from(token)
    .bindAsync(async t  => Option.from(await auth.validate(t)))
    .bindAsync(async id => Option.from(await db.preferences.find(id)))
    .then(opt => opt.orElseAsync(async () => recommendations.trending()));
```

---

## Recipe: Either async chain

```typescript
import { Either } from '@ngwes/mini-fp';

type ApiError = { code: string; message: string };

const handle = async (token: string): Promise<Either<ApiError, User>> =>
  Either.right<ApiError, string>(token)
    .bindAsync(async t    => authenticate(t))
    .bindAsync(async id   => fetchUser(id))
    .bindAsync(async user => Promise.resolve(requireAdmin(user)));

const result = await handle('my-token');
result.match(
  user  => console.log('ok', user),
  error => console.error(error.code, error.message)
);
```

---

## Recipe: Mix sync and async steps

```typescript
import { Either } from '@ngwes/mini-fp';

Either.right<string, string>(rawInput)
  .bind(parseFormat)
  .bind(validate)
  .bindAsync(input => saveToDb(input))
  .bindAsync(record => notify(record.id));
```

---

## Recipe: TryAsync for async exception boundaries

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const data = await TryAsync.runAsync(() => fetch(url).then(r => r.json()))
  .onFailAsync(async err => {
    await logger.error(err);
    return cachedData;
  });
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

- `bindAsync` on `Option`/`Either` returns `OptionAsync`/`EitherAsync` — both implement `PromiseLike`, so `await` works directly.
- Once in `OptionAsync`/`EitherAsync`, keep chaining with `.bindAsync()` — no need to await between steps.
- To re-enter a sync chain after async steps, `await` the `EitherAsync` and call `.bind()` on the result.
- `TryAsync` is for exception boundaries only — it has no `map`/`bind`, only `onFailAsync`.

---
