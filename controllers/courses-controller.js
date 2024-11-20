const { validationResult } = require("express-validator");

const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");

const appError = require("../utils/appError");

const course = require("../models/course_model");

const getCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { courses } });
};

const getCourse = async (req, res) => {
  try {
    const findedCourse = await course.findById(req.params.id);
    if (!findedCourse) {
      return res.status(400).json({ status: FAIL, data: err });
    }
    return res.status(200).json({ status: SUCCESS, data: { findedCourse } });
  } catch (err) {
    return res.status(400).json({
      status: ERROR,
      data: null,
      message: "invalid object id",
      code: 400,
    });
  }
};

const addCourse = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      status: ERROR,
      data: null,
      message: error.array(),
      code: 400,
    });
  }
  const newCourse = new course(req.body);
  await newCourse.save();
  res.status(201).json({ status: SUCCESS, data: { newCourse } });
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCourse = await course.findByIdAndUpdate(id, {
      $set: req.body,
    });
    return res.status(200).json({ status: SUCCESS, data: { updatedCourse } });
  } catch (err) {
    return res.status(400).json({ status: ERROR, data: err });
  }
};

const deletCourse = async (req, res) => {
  try {
    const deletedOne = await course.deleteOne({ _id: req.params.id });
    return res.status(200).json({ status: SUCCESS, data: null });
  } catch (err) {
    return res.status(400).json({ status: ERROR, data: err });
  }
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
};
