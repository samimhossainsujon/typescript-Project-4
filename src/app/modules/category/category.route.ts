import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../auth/auth.constant';
import { CatagoryController } from './category.controller';
import { CatagoryValidationSchema } from './category.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CatagoryValidationSchema),
  CatagoryController.createCatagory,
);

router.get('/', CatagoryController.getAllCatagory);

export const CatagoryRoutes = router;
