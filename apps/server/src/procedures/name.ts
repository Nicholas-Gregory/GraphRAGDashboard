import { nameSchema } from "@graphragdashboard/packages/schemas/name";
import { upsertName } from "src/database-layer/queries/name";
import { privateProcedure } from "src/middleware/private-procedure";
import { inputSchema } from '@graphragdashboard/packages/schemas/util';

export const createName = privateProcedure
.input(inputSchema(nameSchema))
.mutation(async ({ input, ctx }) => {
  const result = await upsertName(ctx.db, input, ctx.session.userId);

  return result;
})