import z from "zod";
import { publicProcedure } from "../trpc";
import { userSchema } from "@graphragdashboard/packages/schemas/user";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";
import { getIronSession } from 'iron-session';

export const signUp = publicProcedure
.input(userSchema.omit({ id: true }))
.mutation(async ({ input, ctx }) => {
  // const hashedPassword = await bcrypt.hash(input.password, 10);
  const db = ctx.db;

  try {
    // await db.create('User', {
    //   email: input.email,
    //   password: hashedPassword,
    //   username: input.username,
    //   id: crypto.randomUUID()
    // })
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create user",
      cause: error
    });
  }
})

export const logIn = publicProcedure
.input(z.object({
  email: z.email().optional(),
  password: z.string().min(6).max(100),
  username: z.string().min(3).max(20).optional()
}))
.mutation(async ({ input, ctx }) => {
  const db = ctx.db;

  // const node = (await db.cypher('MATCH (u:User) WHERE u.email = $email OR u.username = $username RETURN u', {
  //   email: input.email,
  //   username: input.username
  // })).records[0].get('u');

  // compare bcrypt passwords
  // const isValid = await bcrypt.compare(input.password, node.properties.password);
  // if (!isValid) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //     message: "Invalid email/username or password"
  //   });
  // }

  // ctx.session.userId = node.properties.id;
  ctx.session.isLoggedIn = true;
  await ctx.session.save();

  return { success: true }
});

export const logOut = publicProcedure
.mutation(({ ctx }) => {
  ctx.session.destroy();

  return { success: true };
})