import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../auth/auth.constant';
import { ReviewController } from './review.controller';
import { ReviewValidationSchema } from './review.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidationSchema),
  ReviewController.createReview,
);

export const ReviewRoutes = router;
