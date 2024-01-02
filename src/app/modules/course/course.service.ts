import CourseModel from '../courses/courses.model';
import ReviewModel from '../review/review.model';

const getBestCourseFromDb = async () => {
  try {
    const averageRatings = await ReviewModel.aggregate([
      {
        $group: {
          _id: '$courseId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);
    averageRatings.sort((a, b) => b.averageRating - a.averageRating);

    const coursesWithReviews = await Promise.all(
      averageRatings.map(async (rating) => {
        const courseDetails = await CourseModel.findById(rating._id).populate('createdBy');       
        if (courseDetails) {
          return {
            course: courseDetails,
            averageRating: rating.averageRating,
            reviewCount: rating.reviewCount,
          };
        }
        return null;
      }),
    );

    const filteredCourses = coursesWithReviews.filter(
      (course) => course !== null,
    );

    return filteredCourses;
  } catch (error) {
    throw new Error('Error retrieving best course from the database');
  }
};
export const CourseServices = {
  getBestCourseFromDb,
};
