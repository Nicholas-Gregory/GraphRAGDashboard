import z from "zod";
import { publicProcedure } from "../trpc";
import { userSchema } from "@graphragdashboard/packages/schemas/user";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";
import { getIronSession } from 'iron-session';
import { createUser } from "src/database-layer/user";

export const signUp = publicProcedure
.input(userSchema.omit({ id: true }))
.mutation(async ({ input, ctx }) => {
  const db = ctx.db;

  try {
    const user = await createUser(db, {
      email: input.email,
      password: input.password,
      username: input.username
    });

    return user;
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create user",
      cause: error
    });
  }
})

export const logIn = publicProcedure
.input(userSchema
  .omit({ id: true })
  .partial({
    email: true,
    username: true
  })
)
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