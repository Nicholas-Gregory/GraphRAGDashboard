import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const createContext = () => ({});

export const publicProcedure = t.procedure;

export const appRouter = t.router({
  ping: publicProcedure
  .query(() => "pong"),
});

export type AppRouter = typeof appRouter;
