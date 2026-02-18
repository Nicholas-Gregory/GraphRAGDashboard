import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { Driver } from "neo4j-driver";
import { createMockSession, startNeo4j, stopNeo4j } from "../utils";
import { createCaller } from "src/router"


describe("User CRUD Procedures", () => {
  let dbDriver: Driver;

  before(async() => {
    const { driver } = await startNeo4j();
    dbDriver = driver;
  })

  after(async () => {
    await stopNeo4j();
  });

  test("should return null if no session", async () => {
    // 1. Create the typed caller with the container context
    const caller = createCaller({ db: dbDriver, session: createMockSession() });

    const result = await caller.me();
    assert.equal(
      result.user,
      null
    );
  });

  test("should return user data if session is active", async () => {
    const caller = createCaller({
      db: dbDriver,
      session: createMockSession({ userId: "test-user", isLoggedIn: true })
    });

    const result = await caller.me();

    assert.equal(result.user.id, "test-user");
  })
})