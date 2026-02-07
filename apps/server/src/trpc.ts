import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";
import { db } from "./config";
import { signUp } from "./procedures/auth";

export const createContext = ({ req }: CreateNextContextOptions) => {
  const header = req.headers.authorization;
  const context = { db };

  if (header?.startsWith('Bearer ')) {
    const token = header.split(' ')[1];

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return { ...context, user };
    } catch {
      return context;
    }
  }

  return context;
};

type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
