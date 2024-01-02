/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewModel from '../review/review.model';
import { Tcourse, Tcourses } from './courses.interface';
import CourseModel from './courses.model';

const createCourseIntoDB = async (course: Tcourse) => {
  course.createdAt = new Date();
  course.updatedAt = new Date();
  class CourseService {
    calculateDurationInWeeks(startDate: string, endDate: string): number {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = Math.abs(end.getTime() - start.getTime());
      const durationInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const durationInWeeks = Math.ceil(durationInDays / 7);
      return durationInWeeks;
    }
    async createCourse(courseData: Tcourse): Promise<Tcourse> {
      const { startDate, endDate } = courseData;
      courseData.durationInWeeks = this.calculateDurationInWeeks(
        startDate,
        endDate,
      );

      const newCourse = new CourseModel(courseData);
      const savedCourse = await (await newCourse.save()).populate('createdBy');
      return savedCourse;
    }
  }

  const courseService = new CourseService();
  const result = await courseService.createCourse(course);
  return result;
};

const getSingleCoursesFromDB = async (_id: string) => {
  const CourseData = await CourseModel.findOne({ _id }).populate('createdBy');
  const courseRevies = await ReviewModel.find({ courseId: _id })
    .select({
      __v: 0,
    })
    .populate('createdBy');

  const result = { course: CourseData, reviews: courseRevies };
  return result;
};

const updateCoursesDataInDB = async (
  courseId: string,
  updatedData: {
    title: string;
    instructor: string;
    categoryId: object;
    price: number;
    tags: { name: string; isDeleted: boolean }[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    details: {
      level: string;
      description: string;
    };
  },
) => {
  const UpdateCourses = await CourseModel.findOneAndUpdate(
    { _id: courseId },
    updatedData,
    {
      new: true,
    },
  ).select({
    _id: 1,
    courseId: 1,
    title: 1,
    categoryId: 1,
    price: 1,
    tags: 1,
    startDate: 1,
    endDate: 1,
    language: 1,
    provider: 1,
    details: 1,
  });

  if (!UpdateCourses) {
    throw new Error('Courses not found');
  }

  return UpdateCourses;
};

const getPaginatedAndFilteredCoursesFromDB = async (filters: Tcourses) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = filters;

  const query: any = {};

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  if (tags) {
    query.tags.name = tags;
  }

  if (startDate || endDate) {
    query.startDate = {};
    if (startDate) query.startDate.$gte = new Date(startDate);
    if (endDate) query.startDate.$lte = new Date(endDate);
  }

  if (language) query.language = language;
  if (provider) query.provider = provider;
  if (durationInWeeks) query.durationInWeeks = durationInWeeks;
  if (level) query.level = level;

  const sortOption: any = {};
  if (sortBy) {
    sortOption[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const result = await CourseModel.find(query)
    .select({
      __v: 0,
      currentPassword: 0,
      newPassword: 0,
      passwordChangeHistory: 0,
    })
    .populate('createdBy')
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  return result;
};

export const CoursesServices = {
  createCourseIntoDB,
  getSingleCoursesFromDB,
  updateCoursesDataInDB,
  getPaginatedAndFilteredCoursesFromDB,
};
