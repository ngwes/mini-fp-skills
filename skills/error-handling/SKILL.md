---
name: error-handling
description: Pattern guide for typed error handling with Either and Try from @ngwes/mini-fp.
---

## Problem

Propagate structured errors through a multi-step pipeline without using exceptions.

## Type Selection

| Scenario | Use |
|---|---|
| Typed error, stop on first failure | `Either<ErrorType, T>` |
| Third-party code that throws | `Try.run(...).toEither().mapLeft(...)` |
| Async pipeline | `mapAsync`/`bindAsync` → `EitherAsync` (same methods as `Either`) |
| Value may be null/undefined | `Option.from(v).toEither(error)` or `toEither(v, error)` |

---

## Recipe: Typed error pipeline

```typescript
import { Either } from '@ngwes/mini-fp';

type AppError = { code: string; message: string };

const parseId = (raw: string): Either<AppError, number> => {
  const n = Number(raw);
  return isNaN(n)
    ? Either.left({ code: 'INVALID_ID', message: `"${raw}" is not a number` })
    : Either.right(n);
};

const fetchUser = async (id: number): Promise<Either<AppError, User>> => {
  const user = await db.users.findById(id);
  return user
    ? Either.right(user)
    : Either.left({ code: 'NOT_FOUND', message: `User ${id} not found` });
};

const requireAdmin = (user: User): Either<AppError, User> =>
  user.role === 'admin'
    ? Either.right(user)
    : Either.left({ code: 'FORBIDDEN', message: 'Admin access required' });

// Pipeline — each step only runs if the previous succeeded
const handle = (rawId: string) =>          // EitherAsync<AppError, User>
  parseId(rawId)
    .bindAsync(id => fetchUser(id))
    .bind(requireAdmin);                   // sync step directly on EitherAsync

// Consume — match on EitherAsync returns a Promise
await handle('42').match(
  user  => res.status(200).json(user),
  error => {
    const status =
      error.code === 'NOT_FOUND' ? 404 :
      error.code === 'FORBIDDEN' ? 403 : 400;
    res.status(status).json(error);
  }
);
```

---

## Recipe: Wrap throwing code → Either

```typescript
import { Try, Either, Unit } from '@ngwes/mini-fp';

const safeParseJson = <T>(raw: string): Either<AppError, T> =>
  Try.run(() => JSON.parse(raw) as T)
    .toEither()                                        // Either<unknown, T>
    .mapLeft(e => ({ code: 'BAD_JSON', message: (e as Error).message }));

// Try<void> → map to Unit first: toEither() throws on a null/undefined value
Try.run(() => fs.writeFileSync(path, data)).map(() => Unit.default).toEither();
```

---

## Recipe: Async exception boundary

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const fetchConfig = (url: string): Promise<Config> =>
  TryAsync.runAsync(() => fetch(url).then(r => r.json()))
    .onFail(defaultConfig);                            // value, factory, or (err) => value

const loadUser = (id: string) =>                       // EitherAsync<AppError, User>
  TryAsync.runAsync(() => api.getUser(id))
    .toEither()
    .mapLeft(e => ({ code: 'UPSTREAM', message: String(e) }));
```

---

## Recipe: Recover on left (error fallback)

```typescript
Either.left<string, number>('cache_miss')
  .bindLeftAsync(async code => {
    const value = await db.query(code);
    return value
      ? Either.right(value)
      : Either.left('db_miss');
  });
```
