import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const auth = publicProcedure.use((opts: any) => {
  const user = opts.ctx.session.isLoggedIn;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authenticated"
    });
  }

  return opts.next({
    ctx: {
      session: opts.ctx.session
    }
  });
});
