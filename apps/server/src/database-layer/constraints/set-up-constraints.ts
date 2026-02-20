import { createUserConstraints } from "./user";
import { createTextConstraints } from "./text";
import { Driver } from "neo4j-driver";
import { createIdentityConstraints } from "./identity";

export const setUpConstraints = async (db: Driver) => {
  await createUserConstraints(db);
  await createTextConstraints(db);
  await createIdentityConstraints(db);
};