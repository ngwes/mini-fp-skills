import assert from 'node:assert/strict';
import { tests } from '@ngwes/skill-be/testing';

type Deps = {
  userSettings: Map<string, string>;
  orgSettings: Map<string, string>;
  logger: { debug: (message: string) => void };
};

type ResolveTheme = (deps: Deps) => (userId: string, orgId: string) => string;

const test = tests<{ result: ResolveTheme }>();

/** Settings for user u1 and organization o1; `debugLines` lists what the code logged. */
function settings(user?: string, org?: string): Deps & { debugLines: string[] } {
  const debugLines: string[] = [];
  return {
    debugLines,
    userSettings: new Map(user === undefined ? [] : [['u1', user]]),
    orgSettings: new Map(org === undefined ? [] : [['o1', org]]),
    logger: { debug: (message) => void debugLines.push(message) },
  };
}

test("uses the user's theme when it is supported", ({ result }) => {
  assert.equal(result(settings('dark', 'light'))('u1', 'o1'), 'dark');
});

test('falls back to the organization theme when the user has none', ({ result }) => {
  assert.equal(result(settings(undefined, 'light'))('u1', 'o1'), 'light');
});

test("falls back to the organization theme when the user's is unsupported", ({ result }) => {
  assert.equal(result(settings('neon', 'light'))('u1', 'o1'), 'light');
});

test("uses 'system' when neither theme is supported", ({ result }) => {
  assert.equal(result(settings('neon', 'sepia'))('u1', 'o1'), 'system');
});

test('writes a debug line when the user has no supported theme', ({ result }) => {
  const deps = settings('neon', 'light');

  result(deps)('u1', 'o1');

  assert.ok(deps.debugLines.length > 0);
});

test("writes no debug line when the user's theme is supported", ({ result }) => {
  const deps = settings('dark', 'light');

  result(deps)('u1', 'o1');

  assert.equal(deps.debugLines.length, 0);
});
