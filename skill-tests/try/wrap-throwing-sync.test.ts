import assert from 'node:assert/strict';
import { tests } from '@ngwes/skill-be/testing';

const test = tests<{ result: (text: string) => unknown }>();

test('returns the parsed object for valid JSON', ({ result }) => {
  assert.deepEqual(result('{"port":8080,"debug":true}'), { port: 8080, debug: true });
});

test('returns an empty object for malformed JSON', ({ result }) => {
  assert.deepEqual(result('{"port":'), {});
});

test('returns an empty object for an empty string', ({ result }) => {
  assert.deepEqual(result(''), {});
});
