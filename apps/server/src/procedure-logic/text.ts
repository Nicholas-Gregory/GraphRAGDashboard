import { db } from "src/config";
import z from "zod";

export const writeFullTextNode = async (content: string) => {
  const id = crypto.randomUUID();
  console.log('here')
  // return await db.batch([{ query: 'CREATE (t:Text:FullText {id: $id, content: $content, dateAdded: $dateAdded})', params: {
  //   id,
  //   content,
  //   dateAdded: "now"
  // }}]);
}

export const getTextById = async (id: z.ZodUUID) => {
  const textNode = {}; /*= await db.cypher('MATCH (t:Text) WHERE t.id = $id RETURN t', {
    id
  });*/
  return textNode;
}