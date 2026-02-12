import z from 'zod';

export const textSchema = z.object({
  id: z.uuid(),
  dateAdded: z.date(),
  content: z.string().min(1)
});

export type Text = z.infer<typeof textSchema>;