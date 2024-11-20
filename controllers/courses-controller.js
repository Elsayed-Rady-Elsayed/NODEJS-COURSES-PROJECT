// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const course = require("../models/course_model");

const getCourses = async (req, res) => {
  const courses = await course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  // const id = +req.params.id;
  // const course = courses.find((course) => course.id === id);
  try {
    const findedCourse = await course.findById(req.params.id);
    if (!findedCourse) {
      return res.status(404).json({
        message: "no courses found",
      });
    }
    return res.status(200).json(findedCourse);
  } catch (err) {
    return res.status(400).json({ message: "invalid id" });
  }
};

const addCourse = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      message: error.array(),
    });
  }
  // const newCourse = courses.push(req.body);
  const newCourse = new course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCourse = await course.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  // const id = +req.params.id;
  // let course = courses.find((c) => c.id === id);
  // if (course) {
  //   course = { ...course, ...req.body };
  //   res.status(200).json(course);
  // } else {
  //   return res.status(404).json({
  //     message: "not found",
  //   });
  // }
};

const deletCourse = (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (!course) {
    return res.status(404).json({
      message: "not found",
    });
  }
  courses = courses.filter((el) => {
    return el.id !== id;
  });
  res.status(200).json({
    message: "deleted successfully",
  });
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deletCourse,
};
