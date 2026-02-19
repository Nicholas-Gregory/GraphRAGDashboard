import { wnoName } from "@graphragdashboard/packages/schemas/wno-name";
import { upsertWnoName } from "src/database-layer/queries/name";
import { privateProcedure } from "src/middleware/private-procedure";

export const createWnoName = privateProcedure
.input(
  wnoName.omit({
    id: true,
    dateAdded: true
  })
)
.mutation(async ({ input, ctx }) => {
  const result = await upsertWnoName(ctx.db, input, ctx.session.userId);

  return result;
})