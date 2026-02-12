import z from "zod";

export const nameSchema = z.object({
  id: z.uuid(),
  value: z.string().min(2).max(100),
  dateAdded: z.date()
});

export type Name = z.infer<typeof nameSchema>;