import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc";

export const authedProcedure = publicProcedure.use((opts: any) => {
  const user = opts.ctx.user;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authenticated"
    });
  }
  
  return opts.next({
    ctx: {
      ...opts.ctx,
      user
    }
  });
});
