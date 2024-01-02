import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendCourseResponse from '../../utils/sendCourseResposnse';
import { Tcourses } from './courses.interface';
import { CoursesServices } from './courses.service';

const createCourse = catchAsync(async (req, res) => {
  req.body.createdBy = req.username._id;
  const body = req.body;
  const result = await CoursesServices.createCourseIntoDB(body);
  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: {
      course: {
        _id: result._id,
        instructor: result.instructor,
        categoryId: result.categoryId,
        price: result.price,
        tags: result.tags,
        startDate: result.startDate,
        endDate: result.endDate,
        language: result.language,
        provider: result.provider,
        durationInWeeks: result.durationInWeeks,
        details: result.details,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
      createdBy: {
        createdBy: result?.createdBy?._id,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    },
  });
});

const getSingleCourses = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const courseid = await CoursesServices.getSingleCoursesFromDB(_id);
  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course Data retrieved successfully',
    data: {
      course: courseid,
    },
  });
});

const UpdateCourses = catchAsync(async (req, res) => {
  const courseId: string = req.params._id;
  const updatedCourses = req.body;

  if (!courseId) {
    throw new Error('Course Id is required');
  }

  const CoursesUpdateResult = await CoursesServices.updateCoursesDataInDB(
    courseId,
    updatedCourses,
  );

  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: CoursesUpdateResult,
  });
});

const getPaginatedAndFilteredCourses = catchAsync(async (req, res) => {
  const queryParams = req.query as unknown as Tcourses;
  const result =
    await CoursesServices.getPaginatedAndFilteredCoursesFromDB(queryParams);

  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: {
      course: result,
    },
  });
});

export const CoursesController = {
  createCourse,
  getSingleCourses,
  UpdateCourses,
  getPaginatedAndFilteredCourses,
};
