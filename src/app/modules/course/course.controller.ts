import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendCourseResponse from '../../utils/sendCourseResposnse';
import { CourseServices } from './course.service';

const getBestCourse = catchAsync(async (req, res) => {
  const bestCourseData = await CourseServices.getBestCourseFromDb();
  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: bestCourseData,
  });
});

export const CourseController = {
  getBestCourse,
};
