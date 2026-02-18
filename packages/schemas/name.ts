import z from "zod";

export const nameSchema = z.object({
  id: z.uuid(),
  firstName: z.string().min(2).max(100),
  middleName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100),
  dateAdded: z.date()
});

export type Name = z.infer<typeof nameSchema>;