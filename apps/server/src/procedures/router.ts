import { t } from "../trpc";
import { signUp } from "./auth";
import { getLoggedInUser } from "./user";

export const appRouter = t.router({
  signUp,
  getLoggedInUser
})

export type AppRouter = typeof appRouter;