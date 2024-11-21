const express = require("express");

const { validationSchema } = require("../middlewares/validationSchema");

const coursesController = require("../controllers/courses-controller");

const router = express.Router();

const { verifyToken } = require("../middlewares/verifiyToken");

router
  .route("/")
  .get(coursesController.getCourses)
  .post(verifyToken, validationSchema(), coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(verifyToken, coursesController.deletCourse);

module.exports = router;
