import assert from 'node:assert/strict';
import { tests } from '@ngwes/skill-be/testing';

type WriteFileSync = (path: string, contents: string) => void;

/** The parts of the returned Either the tests read. */
type Saved = { isRight(): boolean; isLeft(): boolean; unwrapLeft(): unknown };

type SaveReport = (writeFileSync: WriteFileSync) => (path: string, contents: string) => Saved;

const test = tests<{ result: SaveReport }>();

test('writes the report and returns a right when the write succeeds', ({ result }) => {
  const writes: [string, string][] = [];

  const saved = result((path, contents) => void writes.push([path, contents]))('report.txt', 'hi');

  assert.equal(saved.isRight(), true);
  assert.deepEqual(writes, [['report.txt', 'hi']]);
});

test('returns a WRITE_FAILED left when the write throws', ({ result }) => {
  const failing: WriteFileSync = () => {
    throw new Error('EACCES: permission denied');
  };

  const saved = result(failing)('report.txt', 'hi');

  assert.equal(saved.isLeft(), true);
  const error = saved.unwrapLeft() as { code: unknown; message: unknown };
  assert.equal(error.code, 'WRITE_FAILED');
  assert.equal(typeof error.message, 'string');
});
