import z from "zod";

export const wnoName = z.object({
  id: z.uuid(),
  givenName: z.string().min(2).max(100),
  middleName: z.string().min(2).max(100).optional(),
  surname: z.string().min(2).max(100),
  dateAdded: z.date()
});

export type WNOName = z.infer<typeof wnoName>;