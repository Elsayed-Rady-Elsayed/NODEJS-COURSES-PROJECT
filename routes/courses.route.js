const express = require("express");

const { body } = require("express-validator");

const coursesController = require("../controllers/courses-controller");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getCourses)
  .post(
    [
      body("title")
        .notEmpty()
        .withMessage("enter valid title")
        .isLength({ min: 5 })
        .withMessage("enter title with more than 5 characters"),
      body("price").notEmpty().withMessage("enter valid price"),
    ],
    coursesController.addCourse
  );

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deletCourse);

module.exports = router;
