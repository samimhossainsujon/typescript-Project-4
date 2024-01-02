import { z } from 'zod';
import { LevelSchema } from './courses.model';

const tagsSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean(),
});

const DetailsSchema = z.object({
  level: z.enum([...LevelSchema] as [string, ...string[]]).optional(),
  description: z.string(),
});

const CourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagsSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number().optional(),
    details: DetailsSchema,
  }),
});

const UpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagsSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().optional(),
    details: DetailsSchema,
  }),
});

export const CoursesValidation = {
  CourseValidationSchema,
  UpdateCourseValidationSchema,
};
