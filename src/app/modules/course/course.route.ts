import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();
router.get('/best', CourseController.getBestCourse);

export const CourseRoutes = router;
