import { t } from "../trpc";
import { logIn, logOut, signUp } from "./auth";
import { me } from "./user";

export const appRouter = t.router({
  signUp,
  me,
  logIn,
  logOut
})

export type AppRouter = typeof appRouter;