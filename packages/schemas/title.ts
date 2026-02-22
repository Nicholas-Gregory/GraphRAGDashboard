import z from 'zod';

export const titleSchema = z.object({
  id: z.uuid(),
  addedBy: z.string(),
  
})