import { publicProcedure } from "src/trpc";
import { auth } from "../middleware/auth";

export const me = publicProcedure
.mutation(async ({ ctx }) => {
  if (!ctx.session.isLoggedIn) {
    return { user: null }
  }

  return { user: { id: ctx.session.userId } }
});