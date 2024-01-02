import { z } from 'zod';

export const ReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number(),
    review: z.string(),
  }),
});
