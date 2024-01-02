import { Treview } from './review.interface';
import ReviewModel from './review.model';

const createReviewIntoDB = async (Review: Treview) => {
  const result = await ReviewModel.create(Review);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
