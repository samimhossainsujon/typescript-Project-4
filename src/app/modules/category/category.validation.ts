import { z } from 'zod';

export const CatagoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
