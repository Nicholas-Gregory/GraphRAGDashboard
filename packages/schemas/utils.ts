import z from "zod";

export const zodToNeode = (zodSchema: z.ZodSchema<any>): any => {
  const neodeSchema: any = {};

  if (zodSchema instanceof z.ZodObject) {
    const shape = zodSchema.shape;

    for (const [key, zodField] of Object.entries(shape)) {
      neodeSchema[key] = convertZodFieldToNeode(zodField);
    }
  }

  return neodeSchema;
};

const convertZodFieldToNeode = (zodField: z.ZodTypeAny): any => {
  const neodeProperty: any = {}

  if (zodField instanceof z.ZodString || zodField instanceof z.ZodEmail) {
    neodeProperty.type = "string";
  } else if (zodField instanceof z.ZodNumber) {
    neodeProperty.type = 'number';
  } else if (zodField instanceof z.ZodUUID) {
    neodeProperty.type = 'uuid';
    neodeProperty.primary = true;
    neodeProperty.required = true;
  }

  // check if zod field is optional
  if (zodField.safeParse(undefined)) {
    neodeProperty.required = false;
  }

  return neodeProperty;
};