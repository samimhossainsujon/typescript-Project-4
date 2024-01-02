import { Tcatagory } from './category.interface';
import CatagoryModel from './category.model';

const createCatagoryIntoDB = async (category: Tcatagory) => {
  category.createdAt = new Date();
  category.updatedAt = new Date();
  const result = await CatagoryModel.create(category);
  return result;
};

const getAllCatagoryFromDB = async () => {
  const result = await CatagoryModel.find().populate('createdBy');
  return result;
};

export const CatagoryServices = {
  createCatagoryIntoDB,
  getAllCatagoryFromDB,
};
