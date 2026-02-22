import z, { ZodAny, ZodObject } from 'zod';
import { InputSchema } from '../types/util';

export function inputSchema<T extends ZodObject>(schema: T) {
  return schema.omit({
    id: true,
    dateAdded: true,
    addedBy: true,
    fullText: true
  }) as InputSchema<T>;
}