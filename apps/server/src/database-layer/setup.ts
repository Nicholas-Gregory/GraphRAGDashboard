import * as neo4j from "neo4j-driver";
import { set } from "zod";
import { setUpConstraints } from "./constraints/set-up-constraints";

export const getDatabaseInstance = async (uri, username, password) => {
  const db = neo4j.driver(uri, neo4j.auth.basic(username, password));

  try {
    const info = await db.getServerInfo();

    console.log("Connected to Neo4j database:", info);

    await setUpConstraints(db);

    return db;
  } catch (error) {
    console.error("Failed to connect to Neo4j database:", error);

    throw error;
  }
};