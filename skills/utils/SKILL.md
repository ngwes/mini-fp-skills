---
name: utils
description: API reference for Unit, Union, traversal functions, functional and list helpers, promise helpers, and the prelude from @ngwes/mini-fp.
---

## Prelude

The common constructors are also exported as plain functions:

```typescript
import { some, none, right, left, valid, invalid } from '@ngwes/mini-fp';

some(42); none<number>(); right<string, number>(1); left<string, number>('e');
valid<string, number>(1); invalid<string, number>(['e']);
```

---

## Unit

Functional equivalent of `void`. Use in generic contexts where you need a type but have no meaningful return value.

```typescript
import { Unit, asTask, toUnitAsync } from '@ngwes/mini-fp';

const result: Either<string, Unit> = doSideEffect() ? right(Unit.default) : left('failed');

await asTask(42)                       // Promise.resolve(42) (alias: asPromise)
await toUnitAsync(cache.save(user))    // awaits, discards the value → Unit.default
```

---

## Union\<T1, T2\> / Union3\<T1, T2, T3\>

Exactly one of two (or three) equal cases — no success/failure meaning, unlike `Either`.

```typescript
import { Union, Union3 } from '@ngwes/mini-fp';

const key = Union.fromT2<number, string>('alice');           // fromT1 / fromT2 — throw on null
key.isT1(); key.isT2();                                       // false, true
key.match(id => byId.get(id), name => byName.get(name))
await key.matchAsync(id => cache.get(id), async name => fetchByName(name))

Union3.fromT3<Circle, Square, Triangle>(t).match(c => …, s => …, t => …)  // isT3(), matchAsync too
```

---

## Traversal functions

Flip a collection of monads into a monad of a collection. Fail-fast, except `sequenceValidate` (see `validate`).

```typescript
import { traverseOption, traverseOptionAsync, traverseEither, traverseEitherAsync, bindAllAsync } from '@ngwes/mini-fp';

traverseOption([some(1), some(2)])                 // some([1, 2]); any none → none
await traverseOptionAsync([some(Promise.resolve(1))])  // Option<Promise<T>>[] → Promise<Option<T[]>>
traverseEither([right(1), left('err')])            // left('err') — first left wins
traverseEither([right(1), right(2)], x => x * 10)  // right([10, 20]) — optional mapper on each right
await traverseEitherAsync([right(Promise.resolve(10))])  // Either<L, Promise<R>>[] → Promise<Either<L, R[]>>

// bindAllAsync: await one Either, pass its right to every fn in parallel → Promise<Either<L, U>[]>
const checks = await bindAllAsync(findCustomer(id), [c => checkCredit(c), c => checkAddress(c)]);
// left → every result is that left, no fn is called
```

---

## Functional helpers

```typescript
import { tee, teeWhen, teeAsync, teeWhenAsync, which, repeatWhile, repeatWhileAsync,
         using, usingAsync, apply, toOption, toOptionAsync, toEither, toEitherAsync } from '@ngwes/mini-fp';

tee(total, t => log(t))                            // runs action, returns the value
teeWhen(quote, q => audit(q), q => q > 10_000)     // only when the predicate holds
await teeAsync(fetchUser(id), u => cache.save(u))  // waits for the action; teeWhenAsync too

which(() => isMorning(), () => 'Good morning', () => 'Hello')      // expression if/else
which(order, o => o.total > 100, o => 'free', o => 'fee')           // value-passing form

repeatWhile(() => 1, x => x < 100, x => x * 2)     // 128 — init, when, step
await repeatWhileAsync(() => fetchPage(1), p => p.hasNext, p => fetchPage(p.number + 1))

using(openFile('a.csv'), f => f.readLines())       // resource has dispose(); always disposed
await usingAsync(conn, c => c.beginTransaction(), (c, tx) => tx.query(sql))  // disposes tx, then conn

apply((a: number, b: number) => a - b, 10)(3)      // 7 — fixes the first argument

toOption(null)                                     // none; toOption(5, x => x > 3) → none
toOption(' a ', s => s.trim(), s => s === '')      // map + noneWhen → some('a')
toEither(user, () => new NotFoundError(id))        // null/undefined → left (factory or value)
await toOptionAsync(fetchUser(id)).map(u => u.name)        // OptionAsync
await toEitherAsync(Promise.resolve(2), 'e').map(x => x + 1)  // EitherAsync → right(3)
```

## List helpers

```typescript
import { filterSome, filterRight, filterLeft, mapSome, mapRight, mapLeft, foldAsync } from '@ngwes/mini-fp';

filterSome([some(1), none<number>(), some(3)], x => x > 1)  // [3] — predicate optional
filterLeft(results)                 // left values; filterRight for right values
mapRight(results, x => x * 10)      // map the right values; mapSome / mapLeft likewise
await foldAsync(ids, 0, async (sum, id) => sum + (await fetchOrder(id)).total)  // in order
```
