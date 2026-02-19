import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import { Driver } from 'neo4j-driver';
import { createMockSession, startNeo4j, stopNeo4j } from '../utils';
import { createCaller } from 'src/router';

describe("Name Procedures", () => {
  let dbDriver: Driver;

  before(async () => {
    const { driver } = await startNeo4j();
    dbDriver = driver;
  });

  after(async () => {
    await stopNeo4j();
  });

  test("should create a new full name", async () => {
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
})