import { Types } from 'mongoose';

export interface Tcatagory {
  name: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  users?: object;
}
