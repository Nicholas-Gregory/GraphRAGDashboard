import { t } from "../trpc";
import { signUp } from "./auth";

export const appRouter = t.router({
  signUp
})

export type AppRouter = typeof appRouter;