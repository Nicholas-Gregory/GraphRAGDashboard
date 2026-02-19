import * as neo4j from 'neo4j-driver';
import 'dotenv/config';
import { getDatabaseInstance } from './database-layer/setup';

export const dbPromise = getDatabaseInstance(
  process.env.NEO4J_URI,
  process.env.NEO4J_USERNAME,
  process.env.NEO4J_PASSWORD
);