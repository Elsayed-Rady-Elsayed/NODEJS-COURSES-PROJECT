let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const getCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const id = +req.params.id;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({
      message: "no courses found",
    });
  }
  res.status(200).json(course);
};

const addCourse = (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    const course = { id: courses.length + 1, ...req.body };
    courses.push(course);
    res.status(201).json(courses);
  } else {
    return res.status(400).json({
      message: error.array(),
    });
  }
};

const updateCourse = (req, res) => {
  const id = +req.params.id;
  let course = courses.find((c) => c.id === id);
  if (course) {
    course = { ...course, ...req.body };
    res.status(200).json(course);
  } else {
    return res.status(404).json({
      message: "not found",
    });
  }
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
