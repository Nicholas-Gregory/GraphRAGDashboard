import z from "zod";
import { userSchema } from "./user";

export const nodeSchema = z.object({
  id: z.uuid(),
  content: z.string().min(1).max(3000),
  dateAdded: z.date(),
  owner: z.lazy(() => userSchema).or(z.uuid())
});

export type Node = z.infer<typeof nodeSchema>;