import assert from 'node:assert/strict';
import { tests } from '@ngwes/skill-be/testing';

type Subscription = { id: string; userId: string; planId: string; expiresAt: Date };
type Plan = { id: string; name: string };

type Db = {
  subscriptions: { find: (userId: string) => Promise<Subscription | null> };
  plans: { find: (planId: string) => Promise<Plan | null> };
};

type PlanName = (db: Db) => (userId: string) => Promise<string>;

const test = tests<{ result: PlanName }>();

const day = 24 * 60 * 60 * 1000;

/** A database with at most one subscription, for user u1; `planLookups` lists the plan finds. */
function fakeDb(subscription: Subscription | null, plan: Plan | null): Db & { planLookups: string[] } {
  const planLookups: string[] = [];
  return {
    planLookups,
    subscriptions: { find: async (userId) => (userId === 'u1' ? subscription : null) },
    plans: {
      find: async (planId) => {
        planLookups.push(planId);
        return plan !== null && plan.id === planId ? plan : null;
      },
    },
  };
}

const subscription = (expiresInMs: number): Subscription => ({
  id: 's1',
  userId: 'u1',
  planId: 'p1',
  expiresAt: new Date(Date.now() + expiresInMs),
});

const pro: Plan = { id: 'p1', name: 'pro' };

test('returns the plan name of an active subscription', async ({ result }) => {
  assert.equal(await result(fakeDb(subscription(30 * day), pro))('u1'), 'pro');
});

test("returns 'free' and looks up no plan when the user has no subscription", async ({ result }) => {
  const db = fakeDb(null, pro);

  assert.equal(await result(db)('u1'), 'free');
  assert.deepEqual(db.planLookups, []);
});

test("returns 'free' and looks up no plan when the subscription has expired", async ({ result }) => {
  const db = fakeDb(subscription(-day), pro);

  assert.equal(await result(db)('u1'), 'free');
  assert.deepEqual(db.planLookups, []);
});

test("returns 'free' when the plan does not exist", async ({ result }) => {
  assert.equal(await result(fakeDb(subscription(30 * day), null))('u1'), 'free');
});
