import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";
import { dbPromise } from "./config";
import { getIronSession } from "iron-session";

export interface SessionData {
  userId: string;
  isLoggedIn: boolean;
}

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getIronSession<SessionData>(req, res, {
    password: process.env.SESSION_SECRET,
    cookieName: 'graphrag_session',
    cookieOptions: {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }
  });

  const db = await dbPromise;

  return {
    session, db
  }
};

type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
