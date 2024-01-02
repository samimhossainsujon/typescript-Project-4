import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../auth/auth.constant';
import { CoursesController } from './courses.controller';
import { CoursesValidation } from './courses.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CoursesValidation.CourseValidationSchema),
  CoursesController.createCourse,);
router.get('/', CoursesController.getPaginatedAndFilteredCourses);
router.get('/:_id/reviews', CoursesController.getSingleCourses);

router.put(
  '/:_id',
  auth(USER_ROLE.admin),
  validateRequest(CoursesValidation.UpdateCourseValidationSchema),
  CoursesController.UpdateCourses,
);

export const CoursesRoutes = router;
