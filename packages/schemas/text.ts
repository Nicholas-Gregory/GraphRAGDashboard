import z from 'zod';

const TextSchema = z.object({
  id: z.uuid(),
  content: z.string().min(1).max(5000),
});

export type Text = z.infer<typeof TextSchema>;