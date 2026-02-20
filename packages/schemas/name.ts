import z from "zod";

export const subNameSchema = z.object({
  name: z.string(),
  type: z.string(),
  primary: z.boolean()
})

export const nameSchema = z.object({
  id: z.uuid(),
  names: z.array(subNameSchema),
  honorific: z.string().optional(),
  preferred: z.string().optional(),
  dateAdded: z.date(),
  addedBy: z.string()
});

export type Name = z.infer<typeof nameSchema>;
export type SubName = z.infer<typeof subNameSchema>;