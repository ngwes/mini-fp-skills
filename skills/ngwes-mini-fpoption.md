---
name: ngwes/mini-fp:option
description: API reference for Option<T> and OptionAsync<T> from @ngwes/mini-fp.
---

## Option\<T\>

Represents a value that may or may not be present. Replaces `null`/`undefined` checks.

```typescript
import { Option } from '@ngwes/mini-fp';
```

### Constructors

```typescript
Option.some(value)               // wraps value — throws if null/undefined
Option.none<T>()                 // represents absence
Option.from(value)               // null/undefined → none, otherwise some
Option.from(value, noneWhen)     // none if predicate returns true
await Option.fromAsync(promise)  // awaits promise, null/undefined → none
```

### State

```typescript
opt.isSome()  // true if value present
opt.isNone()  // true if absent
opt.unwrap()  // returns value — throws if none
```

### Transform

```typescript
opt.map(x => x * 2)              // Option<U> — applies fn if some, skips if none
await opt.mapAsync(async x => …) // Promise<Option<U>>
```

### Chain (flatMap)

```typescript
opt.bind(x => Option.from(lookup(x)))  // Option<U> — prevents Option<Option<T>>
```

### Pattern match

```typescript
opt.match(
  value => `found: ${value}`,
  ()    => 'not found'
)
await opt.matchAsync(
  async value => fetchDetails(value),
  async ()    => defaultDetails()
)
```

### Fallback

```typescript
opt.orElse(defaultValue)                   // T — returns value or default
opt.orElse(() => compute())                // T — lazy factory, only called if none
await opt.orElseAsync(async () => fetch()) // Promise<T>
```

---

## OptionAsync\<T\>

Returned by `opt.bindAsync(...)`. Wraps `Promise<Option<T>>`, implements `PromiseLike` — chainable and awaitable.

```typescript
import { Option, OptionAsync } from '@ngwes/mini-fp';
```

### Entry points

```typescript
// From Option instance
Option.from(value).bindAsync(async x => Option.from(await fetch(x)))
// Returns OptionAsync<U> — chain more .bindAsync() or await directly

// From raw promise
OptionAsync.from(Promise.resolve(Option.some(42)))
```

### Chain

```typescript
await Option.from(token)
  .bindAsync(async t  => Option.from(await auth.validate(t)))
  .bindAsync(async id => Option.from(await db.users.find(id)))
// Stops at first none — downstream steps are skipped
```

### Also accepts a Promise directly

```typescript
opt.bindAsync(existingPromise)  // OptionAsync<U>
```

---

## Gotchas

- `Option.some(null)` → throws. Use `Option.from(null)` instead.
- `opt.unwrap()` on none → throws. Check `isSome()` first, or use `match`/`orElse`.
- `map` expects a plain value; `bind` expects a function returning `Option<U>`.
- `bindAsync` returns `OptionAsync`, not a plain `Promise` — but it implements `PromiseLike` so `await` works directly.
