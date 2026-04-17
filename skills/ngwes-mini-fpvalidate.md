---
name: ngwes/mini-fp:validate
description: API reference for Validate<L, R>, sequenceValidate, and sequenceValidateAsync from @ngwes/mini-fp.
---

## Validate\<L, R\>

Unlike `Either`, does **not** short-circuit — accumulates **all** errors across combined validations.

```typescript
import { Validate } from '@ngwes/mini-fp';
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
- `sequenceValidateAsync` takes `Promise<Validate<L, R>[]>` (a promise of an array), not `Promise<Validate<L, R>>[]`.
