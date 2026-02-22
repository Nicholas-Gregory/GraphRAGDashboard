import { uriSchema } from "@graphragdashboard/packages/schemas/uri";
import { inputSchema } from "@graphragdashboard/packages/schemas/util";
import { insertUri } from "src/database-layer/queries/uri";
import { privateProcedure } from "src/middleware/private-procedure";

export const createUri = privateProcedure
.input(inputSchema(uriSchema))
.mutation(async ({ input, ctx }) => await insertUri(ctx.db, input, ctx.session.userId))