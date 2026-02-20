import { Driver } from 'neo4j-driver';

export const createIdentityConstraints = async (db: Driver) => {
  await db.executeQuery(`
    CREATE CONSTRAINT identity_id_key IF NOT EXISTS
    FOR (i:Identity)
    REQUIRE i.id IS NODE KEY  
  `)

  await db.executeQuery(`
    CREATE CONSTRAINT identity_id_type IF NOT EXISTS
    FOR (i:Identity)
    REQUIRE i.id IS :: STRING  
  `)
}