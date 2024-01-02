import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/register', AuthController.createUser);
router.post('/login', AuthController.LoginUser);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthController.UserChangePassword,
);

export const AuthRoutes = router;
