import z from "zod";

export const uriSchema = z.object({
  id: z.uuid(),
  value: z.url(),
  dateAdded: z.date()
});

export type URI = z.infer<typeof uriSchema>;