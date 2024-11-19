const express = require("express");

const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, title: "reactjs course", price: 650 },
  { id: 2, title: "mongo course", price: 350 },
  { id: 3, title: "nodejs course", price: 550 },
];

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({
      message: "no courses found",
    });
  }
  res.status(200).json(course);
});

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
  (req, res) => {
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
  }
);

app.patch("/api/courses/:id", (req, res) => {
  const id = +req.params.id;
  const course = courses.find((c) => c.id === id);
  if (course) {
    course = { ...course, ...req.body };
  } else {
    return res.status(404).send({
      message: "not found",
    });
  }
});

app.listen(5000, () => {
  console.log("app running on port:5000");
});
