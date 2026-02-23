import assert from "node:assert";
import test, { describe } from "node:test";
import { getDatabaseInstance } from "src/database-layer/setup";
import { createCaller } from "src/router";
import { createMockSession, end } from "tests/utils";

describe('Title Procedures', async () => {
  const dbDriver = await getDatabaseInstance(
    process.env.TEST_DB_URL,
    'neo4j',
    process.env.NEO4J_TEST_PASSWORD
  );

  test('should create a new title', async () => {
    const caller = createCaller({
      db: dbDriver,
      session: createMockSession()
    });

    const user = {
      email: 'jen@test.com',
      username: 'jen',
      password: 'password'
    };

    await caller.signUp(user);
    await caller.logIn(user);

    const result = await caller.createTitle({
      mainTitles: ["Dr. Strangelove", "How I Learned To Love the Bomb"],
    });

    assert.equal(result.fullText, 'Dr. Strangelove: How I Learned To Love the Bomb;')
    assert.equal(result.mainTitles[0], "Dr. Strangelove");
    assert.equal(result.mainTitles[1], "How I Learned To Love the Bomb")
  })

  end();
})