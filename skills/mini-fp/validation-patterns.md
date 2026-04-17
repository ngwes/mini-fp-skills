---
name: ngwes/mini-fp:validation-patterns
description: Pattern guide for collecting all validation errors with Validate from @ngwes/mini-fp.
---

## Problem

Validate input and report **all** errors at once, not just the first.

## Type Selection

Use `Validate<ErrorType, T>`. Use `Either` only when you want to stop on the first failure.

---

## Recipe: Single-field validators

```typescript
import { Validate } from '@ngwes/mini-fp';

type FieldError = { field: string; message: string };

const validateName = (name: string): Validate<FieldError, string> =>
  name.trim().length > 0
    ? Validate.valid(name.trim())
    : Validate.invalid([{ field: 'name', message: 'Name is required' }]);

const validateEmail = (email: string): Validate<FieldError, string> => {
  if (!email.includes('@'))
    return Validate.invalid([{ field: 'email', message: 'Invalid email' }]);
  if (email.length > 254)
    return Validate.invalid([{ field: 'email', message: 'Email too long' }]);
  return Validate.valid(email);
};
```

---

## Recipe: Combine multiple fields (accumulate all errors)

```typescript
const result = validateName('').combine(validateEmail('not-an-email'));

result.isInvalid(); // true
result.unwrapInvalid();
// [{ field: 'name', message: 'Name is required' }, { field: 'email', message: 'Invalid email' }]
```

---

## Recipe: DTO validation

```typescript
import { Validate } from '@ngwes/mini-fp';

interface CreateUserDto { username: string; password: string }

const validateUsername = (s: string): Validate<string, string> => {
  if (s.length < 3)  return Validate.invalid(['username: min 3 chars']);
  if (s.length > 20) return Validate.invalid(['username: max 20 chars']);
  return Validate.valid(s);
};

const validatePassword = (s: string): Validate<string, string> => {
  const errors: string[] = [];
  if (s.length < 8)      errors.push('password: min 8 chars');
  if (!/[A-Z]/.test(s))  errors.push('password: needs uppercase');
  if (!/[0-9]/.test(s))  errors.push('password: needs digit');
  return errors.length ? Validate.invalid(errors) : Validate.valid(s);
};

const validateDto = (dto: CreateUserDto): Validate<string, CreateUserDto> =>
  validateUsername(dto.username)
    .combine(validatePassword(dto.password))
    .map(() => dto);
```

---

## Recipe: Batch validation with sequenceValidate

```typescript
import { Validate, sequenceValidate } from '@ngwes/mini-fp';

const validatePositive = (n: number): Validate<string, number> =>
  n > 0 ? Validate.valid(n) : Validate.invalid([`${n} is not positive`]);

sequenceValidate([-1, 2, -3, 4].map(validatePositive)).unwrapInvalid();
// ['-1 is not positive', '-3 is not positive']
```

---

## Recipe: Async validation

```typescript
import { Validate, sequenceValidateAsync } from '@ngwes/mini-fp';

const result = await Validate.valid<string, number>(5)
  .combineAsync(Promise.resolve(Validate.invalid<string, number>(['async error'])));
// invalid(['async error'])

const asyncResult = await sequenceValidateAsync(
  Promise.resolve([
    Validate.valid<string, number>(1),
    Validate.invalid<string, number>(['bad value']),
  ])
);
// invalid(['bad value'])
```

---
