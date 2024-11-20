const express = require("express");

const { body } = require("express-validator");

const coursesController = require("./controllers/courses-controller");

const router = express.Router();

router.get("/api/courses", coursesController.getCourses);

router.get("/api/courses/:id", coursesController.getCourse);

router.post(
  "/api/courses",
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

router.patch("/api/courses/:id", coursesController.updateCourse);

router.delete("/api/courses/:id", coursesController.deletCourse);

module.exports = {
  router,
};
