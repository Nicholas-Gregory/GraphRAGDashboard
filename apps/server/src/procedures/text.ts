import { auth } from "src/middleware/auth";
import z from "zod";
import { textSchema } from "@graphragdashboard/packages/schemas/text";
import { writeFullTextNode } from "src/procedure-logic/text";

export const writeFullText = auth
.input(textSchema.pick({ content: true }))
.mutation(async ({ input }) => {
  const { content } = input;
  
  return await writeFullTextNode(content);
});