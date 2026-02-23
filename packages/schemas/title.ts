import z from 'zod';

export const titleSchema = z.object({
  id: z.uuid(),
  addedBy: z.string(),
  dateAdded: z.date(),
  fullText: z.string(),
  mainTitles: z.array(z.string()),
  sortTitle: z.string().optional()
});

export type Title = z.infer<typeof titleSchema>;