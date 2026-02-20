import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { Driver } from "neo4j-driver";
import { createMockSession, end, startNeo4j, stopNeo4j } from "../utils";
import { createCaller } from "src/router";
import bcrypt from 'bcryptjs';
import { getDatabaseInstance } from "src/database-layer/setup";


describe("User Procedures", async () => {
  const dbDriver = await getDatabaseInstance(
    process.env.TEST_DB_URL,
    "neo4j",
    process.env.NEO4J_TEST_PASSWORD
  );

  test("should return null if no session", async (t) => {
    // 1. Create the typed caller with the container context
    const caller = createCaller({ db: dbDriver, session: createMockSession() });

    const result = await caller.me();
    assert.equal(
      result.user,
      null
    );
  });

  test("should return user data if session is active", async (t) => {
    const caller = createCaller({
      db: dbDriver,
      session: createMockSession({ userId: "test-user", isLoggedIn: true })
    });

    const result = await caller.me();

    assert.equal(result.user.id, "test-user");
  });

  test("should create a new user", async (t) => {
    const caller = createCaller({
      db: dbDriver,
      session: createMockSession()
    });

    const result = await caller.signUp({
      email: "test1@example.com",
      password: "password",
      username: "testuser1"
    });

    // run cypher query by id and compare the values
    const user = await dbDriver.executeQuery('MATCH (u:User {id: $id}) RETURN u.email, u.username, u.password', {
      id: result.id
    });

    assert.equal(user.records[0].get('u.email'), "test1@example.com");
    assert.equal(user.records[0].get('u.username'), "testuser1");
    assert.equal(bcrypt.compareSync("password", user.records[0].get('u.password')), true);
  });

  test("should log in an existing user", async (t) => {
    const session = createMockSession();
    const caller = createCaller({
      db: dbDriver,
      session
    });

    const createdUser = await caller.signUp({
      email: "test2@example.com",
      password: "password",
      username: "testuser2"
    });

    const result = await caller.logIn({
      email: "test2@example.com",
      password: "password",
      username: "testuser2"
    });

    assert.equal(result.email, "test2@example.com");
    assert.equal(result.username, "testuser2");
    assert.equal(result.id, createdUser.id);
    assert.equal(session.userId, createdUser.id);
    assert.equal(session.isLoggedIn, true);
  });

  end();
});