import { router } from "../trpc";
import { logIn, logOut, signUp } from "./auth";
import { writeFullText } from "./text";
import { me } from "./user";

export const appRouter = router({
  signUp,
  me,
  logIn,
  logOut,
  writeFullText,
})

export type AppRouter = typeof appRouter;