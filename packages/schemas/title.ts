import z from 'zod';

export const subTitleSchema = z.object({
  title: z.string(),
  type: z.string(),
  language: z.string().length(2) //ISO 639-1 codes
})

export const titleSchema = z.object({
  id: z.uuid(),
  addedBy: z.string(),
  dateAdded: z.date(),
  fullText: z.string(),
  mainTitles: z.array(subTitleSchema),
  alternativeTitles: z.array(subTitleSchema).optional(),
  sortTitle: z.string().optional(),
  identifiers: z.array(z.object({
    type: z.enum(['ISBN', 'ISSN', 'DOI', 'ARK', 'UPC']),
    identifier: z.string()
  })).optional()
});

export type Title = z.infer<typeof titleSchema>;