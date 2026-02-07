import z from "zod";
import { publicProcedure } from "../trpc";
import { userSchema } from "@graphragdashboard/packages/schemas/user";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";

export const signUp = publicProcedure
.input(userSchema.omit({ id: true }))
.mutation(async ({ input, ctx }) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const db = ctx.db;

  try {
    await db.create('User', {
      email: input.email,
      password: hashedPassword,
      username: input.username,
      id: crypto.randomUUID()
    })
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create user",
      cause: error
    });
  }
})