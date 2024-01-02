/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.massage || 'Invalid ID';
  const errorMessage = err.value + `is not a valid ID!`;
  return res.status(statusCode).json({
    success: false,
    errorMessage,
    message,
    errorDetails: err,
    stack: err.stack,
  });
};

export default GlobalErrorHandler;
