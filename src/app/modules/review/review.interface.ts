import { Types } from "mongoose";

export interface Treview {
  courseId: object;
  rating: number;
  review: string;
  createdBy: Types.ObjectId;  
  createdAt: Date;
  updatedAt: Date;
}
