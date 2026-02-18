import { me } from "./procedures/user";
import { router, t } from "./trpc";

export const appRouter = router({
  me
});

export const createCaller = t.createCallerFactory(appRouter);