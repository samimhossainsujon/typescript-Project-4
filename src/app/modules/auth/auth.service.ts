/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppErrors';
import { Tuser } from './auth.interface';
import AuthModel from './auth.model';

// ================================================
// create User Into DB
// ================================================

const createUserIntoDB = async (user: Tuser) => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
  const result = await AuthModel.create(user);
  return result;
};

// ================================================
// User Login
// ================================================

const loginUser = async (username: string, password: string) => {
  const user = await AuthModel.findOne({ username }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Incorrect password');
  }
  const jwtPlayload = {
    _id: user._id,
    username: user.username,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPlayload,
    config.jwt_access_secret_token as string,
    { expiresIn: '7d' },
  );

  return {
    accessToken,
    user,
  };
};

// ================================================
// Password Change
// ================================================

const storePasswordChangeHistory = (userId: string, password: string) => {
  if (typeof window !== 'undefined') {
    const history = JSON.parse(localStorage.getItem(userId) || '[]');

    // Keep only the last 2 passwords
    history.push({ password, timestamp: new Date().toISOString() });
    if (history.length > 2) {
      history.shift();
    }

    localStorage.setItem(userId, JSON.stringify(history));
  }
};

const isPasswordInHistory = (userId: string, newPassword: string) => {
  if (typeof window !== 'undefined') {
    const historyString = localStorage.getItem(userId);
    if (historyString) {
      const history = JSON.parse(historyString);
      const lastTwoPasswords = history.slice(-2);
      return lastTwoPasswords.some((change: { password: string }) =>
        bcrypt.compareSync(newPassword, change.password),
      );
    }
  }
  return false;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const user = await AuthModel.findOne({ _id: userData._id }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  const isPasswordMatch = await bcrypt.compare(
    payload.currentPassword,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password does not match');
  }
  const changeHistoryLimit = 2;
  if (isPasswordInHistory(userData._id, payload.newPassword)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Cannot reuse one of the last ${changeHistoryLimit} passwords`,
    );
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await AuthModel.findByIdAndUpdate(userData._id, {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  }).select({
    __v: 0,
    currentPassword: 0,
    newPassword: 0,
    passwordChangeHistory: 0,
  });
  storePasswordChangeHistory(userData._id, payload.newPassword);

  return result;
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};
