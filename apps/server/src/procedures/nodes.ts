import { auth } from "src/middleware/auth";
import z from "zod";

const getNodeById = auth
.input(z.object({
  id: z.uuid()
}))
.query(async ({ input, ctx }) => {
  // const node = await ctx.db.cypher('MATCH (n) WHERE n.id = $id RETURN n', {
  //   id: input.id
  // });
});