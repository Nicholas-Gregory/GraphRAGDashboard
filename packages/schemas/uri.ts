import z from 'zod';

export const uriSchema = z.object({
  id: z.string(),
  dateAdded: z.date(),
  addedBy: z.string(),
  fullText: z.string(),
  protocol: z.string(),
  authority: z.object({
    host: z.string(),
    port: z.number().optional()
  }),
  path: z.string().optional(),
  query: z.string().optional(),
});

export type Uri = z.infer<typeof uriSchema>;