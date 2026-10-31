---
name: validate
description: API reference for Validate<L, R>, sequenceValidate, and sequenceValidateAsync from @ngwes/mini-fp.
---

## Validate\<L, R\>

Unlike `Either`, does **not** short-circuit — accumulates **all** errors across combined validations.

```typescript
import { Validate } from '@ngwes/mini-fp';
// prelude: import { valid, invalid } from '@ngwes/mini-fp' — same as Validate.valid / Validate.invalid
```

### Constructors

```typescript
Validate.valid<L, R>(value)     // passes validation — throws if null
Validate.invalid<L, R>(errors)  // fails validation — errors is L[], throws if null
```

### State

```typescript
v.isValid()        // true if valid
v.isInvalid()      // true if invalid
v.unwrap()         // R    — throws if invalid
v.unwrapInvalid()  // L[]  — throws if valid
```

### Transform and chain

```typescript
v.map(x => x * 2)        // Validate<L, U> — transforms valid value
v.bind(x => validate(x)) // Validate<L, U> — chains validation (short-circuits like Either)
```

### Errors and pattern match

```typescript
v.mapInvalid(e => e.length)                 // Validate<U, R> — transforms EACH error; valid untouched
v.bindInvalid(errors => Validate.valid(0))  // whole L[] → new Validate (recover or replace)

v.match(n => `got ${n}`, errors => errors.join(', '))     // U
v.match('ok', 'ko')                                       // plain values allowed for either branch
await v.matchAsync(async n => n * 2, Promise.resolve(0))  // Promise<U>; fn, async fn or PromiseLike
```

### Combine (key feature — accumulates errors)

```typescript
// Both valid → first value kept
Validate.valid(1).combine(Validate.valid(2)).unwrap()  // 1

// One invalid → errors collected
Validate.valid(10).combine(Validate.invalid(['too large']))  // invalid(['too large'])

// Both invalid → ALL errors merged
Validate.invalid(['required'])
  .combine(Validate.invalid(['must be positive', 'must be integer']))
// invalid(['required', 'must be positive', 'must be integer'])

// Async combine
await v.combineAsync(Promise.resolve(Validate.invalid(['async error'])))
```

`combine(other: Validate<L, R>)` needs the **same** value type `R` on both sides: a `Validate<string, string>` does not combine with a `Validate<string, number>`.

### Recipe: one object from validators of different value types

Widen the field validators to a common value type, run them through `sequenceValidate` to collect every error, then `.map` to build the object. `unwrap()` is safe inside `map`, which only runs when every field is valid.

```typescript
type Signup = { name: string; age: number };

const name = validateName(input.name);  // Validate<string, string>
const age = validateAge(input.age);     // Validate<string, number>

const signup: Validate<string, Signup> = sequenceValidate<string, unknown>([name, age])
  .map(() => ({ name: name.unwrap(), age: age.unwrap() }));
// both invalid → invalid([...nameErrors, ...ageErrors])
```

---

## sequenceValidate

`Validate<L, R>[]` → `Validate<L, R[]>`. Collects all errors — does not short-circuit.

```typescript
import { sequenceValidate } from '@ngwes/mini-fp';

sequenceValidate([Validate.valid(1), Validate.valid(2), Validate.valid(3)]).unwrap()
// [1, 2, 3]

sequenceValidate([
  Validate.invalid(['e1']),
  Validate.valid(5),
  Validate.invalid(['e2', 'e3']),
]).unwrapInvalid()
// ['e1', 'e2', 'e3']
```

## sequenceValidateAsync

```typescript
import { sequenceValidateAsync } from '@ngwes/mini-fp';

const result = await sequenceValidateAsync(
  Promise.resolve([
    Validate.valid<string, number>(1),
    Validate.invalid<string, number>(['err']),
  ])
)
// invalid(['err'])
```

---

## Gotchas

- `Validate.valid(null)` → throws. Never pass null.
- `combine` keeps the **first** value when both are valid — the second is discarded.
- `bind` short-circuits (like `Either`). Use `combine`/`sequenceValidate` to accumulate errors.
- `mapInvalid` maps **each** error (`L → U`); `bindInvalid` receives the **whole** `L[]`.
- `sequenceValidateAsync` takes `Promise<Validate<L, R>[]>` (a promise of an array), not `Promise<Validate<L, R>>[]`.
