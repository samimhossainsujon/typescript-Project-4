import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppErrors';
import { TuserRole } from '../modules/auth/auth.interface';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Not Authorized');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Your Are Not Authorized',
          );
        }
        const role = (decoded as JwtPayload).role;         

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Your Are Not Authorized',
          );
        }

        req.username = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
