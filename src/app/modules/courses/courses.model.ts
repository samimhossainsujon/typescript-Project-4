import { Schema, model } from 'mongoose';
import { Details, TLevel, Tcourse } from './courses.interface';

const tagsSchema = new Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { _id: false },
);

export const LevelSchema: TLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const detailsSchema = new Schema<Details>(
  {
    level: {
      type: String,
      enum: {
        values: LevelSchema,
        message: '{VALUE} is not a valid level',
      },
      required: [true, 'Level is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
  },
  { _id: false },
);

const courseSchema = new Schema<Tcourse>({
  title: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true },
  tags: [{ type: tagsSchema, required: true }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: { type: detailsSchema, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const CourseModel = model<Tcourse>('Course', courseSchema);
export default CourseModel;
