import { logIn, signUp } from "./procedures/auth";
import { createWnoName } from "./procedures/name";
import { me } from "./procedures/user";
import { router, t } from "./trpc";

export const appRouter = router({
  me, signUp, logIn,
  createWnoName
});

export const createCaller = t.createCallerFactory(appRouter);