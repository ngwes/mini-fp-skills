---
name: option
description: API reference for Option<T> and OptionAsync<T> from @ngwes/mini-fp.
---

## Option\<T\>

Represents a value that may or may not be present. Replaces `null`/`undefined` checks.

```typescript
import { Option } from '@ngwes/mini-fp';
// prelude: import { some, none } from '@ngwes/mini-fp' — same as Option.some / Option.none
```

### Constructors

```typescript
Option.some(value)               // wraps value — throws if null/undefined
Option.none<T>()                 // represents absence
Option.from(value)               // null/undefined → none, otherwise some
Option.from(value, noneWhen)     // none if predicate returns true
Option.fromAsync(promise)        // OptionAsync<T> — null/undefined → none
```

### State

```typescript
opt.isSome()  // true if value present
opt.isNone()  // true if absent
opt.unwrap()  // returns value — throws if none
```

### Transform, filter, side effects

```typescript
opt.map(x => x * 2)               // Option<U> — applies fn if some, skips if none
opt.mapAsync(async x => …)        // OptionAsync<U>
opt.filter(x => x > 2)            // keeps some only when the predicate holds
opt.onSome(x => log(x))           // runs on some, returns the same Option
opt.onNone(() => warn('missing')) // runs on none, returns the same Option
```

### Chain (flatMap)

```typescript
opt.bind(x => Option.from(lookup(x)))                 // Option<U> — prevents Option<Option<T>>
opt.bindAsync(async x => Option.from(await fetch(x))) // OptionAsync<U>
```

### Recover from none

```typescript
opt.mapNone(() => 7)                                    // none → Option.from(7); some untouched
opt.bindNone(() => Option.from(db.get(key)))            // none → another Option
opt.bindNoneAsync(() => Option.fromAsync(db.load(key))) // OptionAsync<T> (also mapNoneAsync)
```

### Guards

```typescript
// Guard<T, U> = [when, then]: the first guard whose `when` holds wins, else the first argument
opt.guardMap(x => 'small', [x => x > 3, () => 'large'], [x => x > 1, () => 'medium'])
opt.guardBind(x => Option.some('ok'), [x => x < 0, () => Option.none<string>()])

// guardMapAsync / guardBindAsync → OptionAsync
await opt.guardMapAsync(id => fetchName(id), [id => id === 0, async () => 'root'])
await opt.guardBindAsync(id => Option.fromAsync(db.find(id)), [id => id < 0, async () => Option.none<User>()])
```

In the async variants each `when` stays synchronous and must return a `boolean`. `otherwise` and every `then` must return a `PromiseLike`, so write `async () => 'root'` even for a constant.

### Pattern match, fallback, convert

```typescript
opt.match(value => `found: ${value}`, () => 'not found')
await opt.matchAsync(async value => fetchDetails(value), async () => defaultDetails())

opt.orElse(defaultValue)                   // T — returns value or default
opt.orElse(() => compute())                // T — lazy factory, only called if none
await opt.orElseAsync(async () => fetch()) // Promise<T>

opt.toEither('missing')                    // Either<string, T> — some → right, none → left
opt.toEither(() => new NotFoundError(id))  // factory runs only on none
```

---

## OptionAsync\<T\>

Returned by `fromAsync`, `mapAsync`, `bindAsync`, `mapNoneAsync`, `bindNoneAsync`, `guardMapAsync` and `guardBindAsync`. Wraps `Promise<Option<T>>`, implements `PromiseLike` and **mirrors the `Option` API** (`map`, `bind`, `filter`, `onSome`, `onNone`, `mapNone`, `bindNone`, `guardMap`, `guardBind`, their `Async` variants, `toEither`, `match`, `orElse`, …).

```typescript
import { Option, OptionAsync } from '@ngwes/mini-fp';

OptionAsync.from(Promise.resolve(Option.some(42)))  // wrap a Promise<Option<T>>
OptionAsync.some(42)                                 // already-resolved some
OptionAsync.none<number>()                           // already-resolved none
```

### Chain sync and async steps — no `.then()`

```typescript
const email = await Option.fromAsync(db.findUser(id))
  .filter(u => u.active)
  .bindAsync(u => Option.fromAsync(db.findProfile(u.id)))
  .map(p => p.email)
  .orElse('unknown');   // string
// Stops at first none — downstream steps are skipped

opt.bindAsync(existingPromise)  // also accepts a PromiseLike<Option<U>> directly
```

- `match`, `matchAsync`, `orElse` and `orElseAsync` return a `Promise` of the plain value.
- `toEither` returns an `EitherAsync<L, T>`.

---

## Gotchas

- `Option.some(null)` → throws. Use `Option.from(null)` instead.
- `opt.unwrap()` on none → throws. Check `isSome()` first, or use `match`/`orElse`.
- `map` expects a plain value; `bind` expects a function returning `Option<U>`. `map`/`mapNone` wrap the result with `Option.from`, so `null` becomes none.
- `fromAsync`, `mapAsync` and `bindAsync` return `OptionAsync`, not a plain `Promise` — keep chaining on it and `await` once at the end to get the `Option`.
