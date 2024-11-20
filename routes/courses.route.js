const express = require("express");

const { body } = require("express-validator");

const coursesController = require("../controllers/courses-controller");

const router = express.Router();

router.get("/", coursesController.getCourses);

router.get("/:id", coursesController.getCourse);

router.post(
  "/",
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

router.patch("/:id", coursesController.updateCourse);

router.delete("/:id", coursesController.deletCourse);

module.exports = router;
