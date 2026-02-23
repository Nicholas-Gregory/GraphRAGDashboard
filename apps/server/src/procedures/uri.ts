import { uriSchema } from "@graphragdashboard/packages/schemas/uri";
import { insertUri } from "src/database-layer/queries/uri";
import { privateProcedure } from "src/middleware/private-procedure";

export const createUri = privateProcedure
.input(uriSchema.omit({
  id: true,
  dateAdded: true,
  addedBy: true,
  fullText: true
}))
.mutation(async ({ input, ctx }) => await insertUri(ctx.db, input, ctx.session.userId))