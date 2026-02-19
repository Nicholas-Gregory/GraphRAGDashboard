import { Driver } from "neo4j-driver";

export const createTextConstraints = async (db: Driver) => {
  await db.executeQuery(`
    CREATE CONSTRAINT text_content_exists IF NOT EXISTS
    FOR (t:Text)
    REQUIRE t.content IS NOT NULL
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT text_content_type IF NOT EXISTS
    FOR (t:Text)
    REQUIRE t.content IS :: STRING
  `);

  await db.executeQuery(`
    CREATE CONSTRAINT has_text_part_position IF NOT EXISTS
    FOR ()-[r:HAS_TEXT_PART]-()
    REQUIRE r.position IS NOT NULL
  `);
    
  await db.executeQuery(`
    CREATE CONSTRAINT has_text_part_position_type IF NOT EXISTS
    FOR ()-[r:HAS_TEXT_PART]-()
    REQUIRE r.position IS :: INTEGER
  `);
};
