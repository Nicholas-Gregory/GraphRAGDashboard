import z from 'zod';

export const uriSchema = z.object({
  id: z.string(),
  dateAdded: z.string(),
  addedBy: z.string(),
  fullText: z.string(),
  protocol: z.string(),
  authority: z.object({
    host: z.string(),
    port: z.number()
  }),
  path: z.string(),
  query: z.string(),
  type: z.string().optional(),
  metadata: z.string().optional()
});

export type Uri = z.infer<typeof uriSchema>;