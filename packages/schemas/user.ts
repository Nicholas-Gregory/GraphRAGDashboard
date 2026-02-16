import z from 'zod';
import { nodeSchema } from './node';

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
  nodes: z.array(z.lazy(() => nodeSchema).or(z.uuid())).optional()
});

export type User = z.infer<typeof userSchema>;