const { validationResult } = require("express-validator");

const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");

const appError = require("../utils/appError");

const course = require("../models/course_model");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getCourses = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const findedCourse = await course.findById(id);
  if (!findedCourse) {
    const error = appError.create("Course not found", 404, "Not Found");
    return next(error);
  }
  return res.status(200).json({ status: "SUCCESS", data: { findedCourse } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, "BAD REQUEST");
    return next(error);
  }
  const newCourse = new course(req.body);
  await newCourse.save();
  res.status(201).json({ status: SUCCESS, data: { newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updatedCourse = await course.findByIdAndUpdate(id, {
    $set: req.body,
  });
  return res.status(200).json({ status: SUCCESS, data: { updatedCourse } });
});

const deletCourse = asyncWrapper(async (req, res) => {
  const deletedOne = await course.deleteOne({ _id: req.params.id });
  return res.status(200).json({ status: SUCCESS, data: null });
});

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
};
