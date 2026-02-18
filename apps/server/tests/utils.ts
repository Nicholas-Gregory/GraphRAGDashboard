import { Neo4jContainer, StartedNeo4jContainer } from '@testcontainers/neo4j';
import neo4j, { Driver } from 'neo4j-driver';
import 'dotenv/config';
import { IronSession } from "iron-session";
import { SessionData } from "src/trpc";

let container: StartedNeo4jContainer;
let driver: Driver;

export const startNeo4j = async () => {
  container = await new Neo4jContainer("neo4j:5.12.0")
  .withPassword(process.env.NEO4J_TEST_PASSWORD)
  .start();

  driver = neo4j.driver(
    container.getBoltUri(),
    neo4j.auth.basic("neo4j", container.getPassword())
  );

  return { driver, container };
};

export const stopNeo4j = async () => {
  if (driver) {
    await driver.close();
  }
  if (container) {
    await container.stop();
  }
};

export const createMockSession = (initialData?: SessionData): IronSession<SessionData> => {
  return {
    userId: initialData?.userId,
    isLoggedIn: initialData?.isLoggedIn,
    save: async () => {},
    destroy: () => {}
  } as IronSession<SessionData>;
};
