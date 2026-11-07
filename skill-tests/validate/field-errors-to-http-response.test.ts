import assert from 'node:assert/strict';
import { invalid, valid, type Validate } from '@ngwes/mini-fp';
import { tests } from '@ngwes/skill-be/testing';

type Request = { email: string; password: string; age: number };

type Validators = {
  validateEmail: (email: string) => Validate<string, string>;
  validatePassword: (password: string) => Validate<string, string>;
  validateAge: (age: number) => Validate<string, number>;
};

type Response = { status: number; body: unknown };

type CreateAccount = (validators: Validators) => (request: Request) => Response | Promise<Response>;

const test = tests<{ result: CreateAccount }>();

/** The existing validators the task talks about, with messages formatted as 'field: reason'. */
const validators: Validators = {
  validateEmail: (email) => (email.includes('@') ? valid(email) : invalid(['email: must contain @'])),
  validatePassword: (password) =>
    password.length >= 12 ? valid(password) : invalid(['password: too short']),
  validateAge: (age) => (age >= 18 ? valid(age) : invalid(['age: must be at least 18'])),
};

const request: Request = { email: 'ada@example.com', password: 'correct horse battery', age: 36 };

type FieldError = { field: string; message: string };

test('responds 201 with the account when every field is valid', async ({ result }) => {
  const response = await result(validators)(request);

  assert.equal(response.status, 201);
  assert.equal((response.body as Request).email, 'ada@example.com');
});

test('responds 422 with a FieldError for every invalid field', async ({ result }) => {
  const response = await result(validators)({ email: 'ada', password: 'short', age: 15 });

  assert.equal(response.status, 422);
  const fields = (response.body as FieldError[]).map((error) => error.field).sort();
  assert.deepEqual(fields, ['age', 'email', 'password']);
});

test('splits each message into its field and its reason', async ({ result }) => {
  const response = await result(validators)({ ...request, email: 'ada' });

  const body = response.body as FieldError[];
  assert.equal(body.length, 1);
  assert.equal(body[0].field, 'email');
  assert.equal(body[0].message.trim(), 'must contain @');
});
