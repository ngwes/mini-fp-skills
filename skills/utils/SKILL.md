---
name: ngwes/mini-fp:utils
description: API reference for Unit, traversal functions, and asTask from @ngwes/mini-fp.
---

## Unit

Functional equivalent of `void`. Use in generic contexts where you need a type but have no meaningful return value.

```typescript
import { Unit } from '@ngwes/mini-fp';

Unit.default  // the singleton Unit value
```

```typescript
// Typical use: Either returning no meaningful success value
const result: Either<string, Unit> = doSideEffect()
  ? Either.right(Unit.default)
  : Either.left('failed');
```

---

## Traversal functions

Flip a collection of monadic values into a single monad containing a collection.

### traverseOption

`Option<T>[]` → `Option<T[]>`. Returns `none` on first `none`.

```typescript
import { traverseOption } from '@ngwes/mini-fp';

traverseOption([Option.some(1), Option.some(2)])                      // some([1, 2])
traverseOption([Option.some(1), Option.none(), Option.some(3)])       // none
traverseOption([])                                                     // some([])
```

### traverseOptionAsync

`Option<Promise<T>>[]` → `Promise<Option<T[]>>`. Returns `none` if any element is `none`.

```typescript
import { traverseOptionAsync } from '@ngwes/mini-fp';

await traverseOptionAsync([
  Option.some(Promise.resolve(1)),
  Option.some(Promise.resolve(2)),
])
// some([1, 2])

await traverseOptionAsync([Option.some(Promise.resolve(1)), Option.none()])
// none
```

### traverseEither

`Either<L, R>[]` → `Either<L, R[]>`. Returns first `left` encountered.

```typescript
import { traverseEither } from '@ngwes/mini-fp';

traverseEither([Either.right(1), Either.right(2)])         // right([1, 2])
traverseEither([Either.right(1), Either.left('err')])      // left('err')
traverseEither([])                                         // right([])
```

### traverseEitherAsync

`Either<L, Promise<R>>[]` → `Promise<Either<L, R[]>>`.

```typescript
import { traverseEitherAsync } from '@ngwes/mini-fp';

await traverseEitherAsync([
  Either.right(Promise.resolve(10)),
  Either.right(Promise.resolve(20)),
])
// right([10, 20])

await traverseEitherAsync([Either.right(Promise.resolve(10)), Either.left('err')])
// left('err')
```

---

## asTask

Wraps a plain value in a resolved `Promise<T>`.

```typescript
import { asTask } from '@ngwes/mini-fp';

asTask(42)  // Promise.resolve(42)
```

Use when an API expects `Promise<T>` but you already have a plain value.
