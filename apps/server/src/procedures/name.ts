import { nameSchema } from "@graphragdashboard/packages/schemas/name";
import { upsertName } from "src/database-layer/queries/name";
import { privateProcedure } from "src/middleware/private-procedure";

export const createName = privateProcedure
.input(
  nameSchema.omit({
    id: true,
    dateAdded: true,
    addedBy: true,
    fullText: true
  })
)
.mutation(async ({ input, ctx }) => {
  const result = await upsertName(ctx.db, input, ctx.session.userId);

  return result;
})