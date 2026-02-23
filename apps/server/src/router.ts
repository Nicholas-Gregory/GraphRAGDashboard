import { logIn, signUp } from "./procedures/auth";
import { createName } from "./procedures/name";
import { createTitle } from "./procedures/title";
import { createUri } from "./procedures/uri";
import { me } from "./procedures/user";
import { router, t } from "./trpc";

export const appRouter = router({
  me, signUp, logIn,
  createName,
  createUri,
  createTitle
});

export const createCaller = t.createCallerFactory(appRouter);