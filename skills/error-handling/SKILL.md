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
| Third-party code that throws | `Try<T>` to capture, then convert to `Either` |
| Async pipeline | `bindAsync` → `EitherAsync` |

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
const handle = async (rawId: string): Promise<Either<AppError, User>> =>
  parseId(rawId)
    .bindAsync(id   => fetchUser(id))
    .bindAsync(user => Promise.resolve(requireAdmin(user)));

// Consume
const result = await handle('42');
result.match(
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
import { Try, Either } from '@ngwes/mini-fp';

const safeParseJson = <T>(raw: string): Either<Error, T> => {
  const t = Try.run(() => JSON.parse(raw) as T);
  if (t.isSuccess()) return Either.right(t.onFail(() => null as never));
  return Either.left(t.onFail(e => e as Error) as unknown as Error);
};
```

---

## Recipe: Async exception boundary

```typescript
import { TryAsync } from '@ngwes/mini-fp';

const fetchConfig = (url: string): Promise<Config> =>
  TryAsync.runAsync(() => fetch(url).then(r => r.json()))
    .onFailAsync(_err => defaultConfig);
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
