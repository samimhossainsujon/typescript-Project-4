/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendCourseResponse from '../../utils/sendCourseResposnse';
import { CatagoryServices } from './category.service';

const createCatagory = catchAsync(async (req, res) => {
  req.body.createdBy = req.username._id;
  const body = req.body;
  const result = await CatagoryServices.createCatagoryIntoDB(body);

  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCatagory = catchAsync(async (req, res) => {
  const result = await CatagoryServices.getAllCatagoryFromDB();
  sendCourseResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: {
      categories: result,
    },
  });
});

export const CatagoryController = {
  createCatagory,
  getAllCatagory,
};
