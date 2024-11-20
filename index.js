const express = require("express");

const coursesController = require("./controllers/courses-controller");

const { body } = require("express-validator");

const app = express();

app.use(express.json());

app.get("/api/courses", coursesController.getCourses);

app.get("/api/courses/:id", coursesController.getCourse);

app.post(
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

app.patch("/api/courses/:id", coursesController.updateCourse);

app.delete("/api/courses/:id", coursesController.deletCourse);

app.listen(5000, () => {
  console.log("app running on port:5000");
});
