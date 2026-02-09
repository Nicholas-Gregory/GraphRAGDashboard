import { publicProcedure } from "src/trpc";
import { auth } from "../middleware/auth";

export const getLoggedInUser = publicProcedure
.query(async ({ ctx }) => {
  if ("user" in ctx && ctx.user) {
    return ctx.user;
  }

  return null;
});