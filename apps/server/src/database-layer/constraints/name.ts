import { Driver } from 'neo4j-driver';

export const createNameConstraints = async (db: Driver) => {
  await db.executeQuery(`
    CREATE CONSTRAINT name_preferred_type IF NOT EXISTS
    FOR (n:Name)
    REQUIRE n.preferred IS :: STRING  
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT name_honorific_type IF NOT EXISTS
    FOR (n:Name)
    REQUIRE n.honorific IS :: STRING  
  `)
}