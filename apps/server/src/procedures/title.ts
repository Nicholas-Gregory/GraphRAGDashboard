import { Title, titleSchema } from "@graphragdashboard/packages/schemas/title";
import { insertTitle } from "src/database-layer/queries/title";
import { privateProcedure } from "src/middleware/private-procedure";
import { ZodObject } from "zod";

export const createTitle = privateProcedure
.input(titleSchema.omit({
  id: true,
  dateAdded: true,
  addedBy: true,
  fullText: true
}))
.mutation(async ({ input, ctx}) => await insertTitle(ctx.db, input, ctx.session.userId));