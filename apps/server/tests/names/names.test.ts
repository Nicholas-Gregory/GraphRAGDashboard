import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import { Driver } from 'neo4j-driver';
import { createMockSession, end, startNeo4j, stopNeo4j } from '../utils';
import { createCaller } from 'src/router';
import { getDatabaseInstance } from 'src/database-layer/setup';

describe("Name Procedures", async () => {
  const dbDriver = await getDatabaseInstance(
    process.env.TEST_DB_URL,
    "neo4j",
    process.env.NEO4J_TEST_PASSWORD
  );

  test("should create a new full name", async (t) => {
    const caller = createCaller({ 
      db: dbDriver, 
      session: createMockSession()
    });

    const givenName = 'Dank';
    const middleName = 'Effin';
    const surname = 'Name';

    const user = { email: 'test@test.com', username: 'test', password: 'password' }

    await caller.signUp(user);
    await caller.logIn(user);

    const result = await caller.createWnoName({
      givenName,
      middleName, 
      surname,
    });

    assert.equal(result.givenName, givenName);
    assert.equal(result.middleName, middleName);
    assert.equal(result.surname, surname);
  })

  end();
})