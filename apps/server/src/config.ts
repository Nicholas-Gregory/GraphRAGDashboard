import * as neo4j from 'neo4j-driver';
import 'dotenv/config';

export const db = neo4j.driver(process.env.NEO4J_URI!, neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!))