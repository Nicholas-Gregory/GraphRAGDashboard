import assert from "node:assert";
import test, { describe } from "node:test";
import { getDatabaseInstance } from "src/database-layer/setup";
import { createCaller } from "src/router";
import { createMockSession, end } from "tests/utils";

describe('Uri Procedures', async () => {
  const dbDriver = await getDatabaseInstance(
    process.env.TEST_DB_URL,
    'neo4j',
    process.env.NEO4J_TEST_PASSWORD
  );

  test('should create a new URI', async () => {
    const caller = createCaller({
      db: dbDriver,
      session: createMockSession()
    });

    const user = { email: 'jacob@test.com', username: 'jacob', password: 'password' };

    await caller.signUp(user);
    await caller.logIn(user);

    const result = await caller.createUri({
      protocol: 'http',
      authority: {
        host: 'localhost',
        port: 4000
      },
      path: '/api/whenever',
      query: 'apples=true'
    });

    assert.equal(result.fullText, 'http://localhost:4000/api/whenever?apples=true');
    assert.equal(result.protocol, 'http');
    assert.equal(result.authority.host, 'localhost');
    assert.equal(result.authority.port, 4000);
    assert.equal(result.path, '/api/whenever');
    assert.equal(result.query, 'apples=true');
  });

  end();
})