const express = require("express");

const { validationSchema } = require("../middlewares/validationSchema");

const coursesController = require("../controllers/courses-controller");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getCourses)
  .post(validationSchema, coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deletCourse);

module.exports = router;
