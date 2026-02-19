import { publicProcedure } from "src/trpc";

export const me = publicProcedure
.mutation(async ({ ctx }) => {
  console.log(ctx.session)
  if (!ctx.session.isLoggedIn) {
    return { user: null }
  }

  return { user: { id: ctx.session.userId } }
});