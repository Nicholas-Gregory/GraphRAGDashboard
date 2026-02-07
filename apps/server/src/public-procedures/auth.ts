import z from "zod";
import { publicProcedure } from "../trpc";

export const signUp = publicProcedure
.input(z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
  username: z.string().min(2).max(100)
}))
.mutation(async (opts) => {
  
})