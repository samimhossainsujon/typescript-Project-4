import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendCourseResponse from '../../utils/sendCourseResposnse';
import { AuthServices } from './auth.service';

// ================================================
// create User Into DB
// ================================================

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.createUserIntoDB(user);
  sendCourseResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      username: result.username,
      email: result.email,
      role: result.role,
      createdAt: result?.createdAt,
      updatedAt: result?.updatedAt,
    },
  });
});

// ================================================
// User Login
// ================================================

const LoginUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthServices.loginUser(username, password);
  sendCourseResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successful',
    data: {
      _id: user?.user?._id,
      username: user?.user?.username,
      email: user?.user?.email,
      role: user?.user?.role,
      token: user?.accessToken,
    },
  });
});

// ================================================
// Password Change
// ================================================

const UserChangePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await AuthServices.changePassword(req.username as JwtPayload, {
    currentPassword,
    newPassword,
  });
  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const AuthController = {
  createUser,
  LoginUser,
  UserChangePassword,
};
