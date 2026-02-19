import z from "zod";
import { publicProcedure } from "../trpc";
import { userSchema } from "@graphragdashboard/packages/schemas/user";
import bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";
import { getIronSession } from 'iron-session';
import { createUser } from "src/database-layer/queries/user";

const signUpInputSchema = userSchema.omit({ 
  id: true,
  nodes: true,
  joinedAt: true
});

export const signUp = publicProcedure
.input(signUpInputSchema)
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
  .omit({ 
    id: true,
    nodes: true,
    joinedAt: true
  })
  .partial({
    email: true,
    username: true
  })
)
.mutation(async ({ input, ctx }) => {
  const db = ctx.db;

  const userResult = await db.executeQuery(
    `
    MATCH (u:User)
    WHERE u.email = $email AND u.username = $username
    RETURN u
    `,
    {
      email: input.email,
      username: input.username
    }
  );

  if (!userResult.records.length) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid email/username or password"
    });
  }

  const userNode = userResult.records[0].get('u');
  const isValid = await bcrypt.compare(input.password, userNode.properties.password);

  if (!isValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid email/username or password"
    });
  }

  ctx.session.userId = userNode.properties.id;
  ctx.session.isLoggedIn = true;
  await ctx.session.save();

  return {
    email: userNode.properties.email,
    username: userNode.properties.username,
    id: userNode.properties.id
  };
});

export const logOut = publicProcedure
.mutation(({ ctx }) => {
  ctx.session.destroy();

  return { success: true };
})