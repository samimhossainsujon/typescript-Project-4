import { Schema, model } from 'mongoose';
import { Treview } from './review.interface';

const ReviewSchema = new Schema<Treview>({
  courseId: { type: Object, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const ReviewModel = model<Treview>('Review', ReviewSchema);
export default ReviewModel;
