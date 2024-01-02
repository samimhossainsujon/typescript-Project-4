import { Response } from 'express';

type TCourseResponse<TCourse> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: TCourse;
};

const sendCourseResponse = <TCourse>(
  res: Response,
  data: TCourseResponse<TCourse>,
) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendCourseResponse;
