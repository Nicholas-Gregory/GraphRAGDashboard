import { logIn, signUp } from "./procedures/auth";
import { me } from "./procedures/user";
import { router, t } from "./trpc";

export const appRouter = router({
  me, signUp, logIn
});

export const createCaller = t.createCallerFactory(appRouter);