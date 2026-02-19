import { Driver } from "neo4j-driver"

export const createUserConstraints = async (db: Driver) => {
  await db.executeQuery(`
    CREATE CONSTRAINT user_id_key IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.id IS NODE KEY
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT user_email_key IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.email IS NODE KEY
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT user_username_key IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.username IS NODE KEY
  `);
    
  await db.executeQuery(`
    CREATE CONSTRAINT user_email_type IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.email IS :: STRING
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT user_username_type IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.username IS :: STRING
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT user_password_type IF NOT EXISTS
    FOR (u:User)
    REQUIRE u.password IS :: STRING
  `);
};