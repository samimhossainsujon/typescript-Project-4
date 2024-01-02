import { Types } from 'mongoose';

export type TLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Details = {
  level: TLevel;
  description: string;
};

export type Tcourse = {
  _id: string;
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  createdBy?: Types.ObjectId;
  price: number;
  tags: { name: string; isDeleted: boolean }[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: Details;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Tcourses = {
  limit: number;
  page: number;
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
  createdBy: Types.ObjectId;
};
