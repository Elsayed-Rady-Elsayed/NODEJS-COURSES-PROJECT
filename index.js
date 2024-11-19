const express = require("express");

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

app.post("/api/courses", (req, res) => {
  const course = { id: courses.length + 1, ...req.body };
  if (!course.title && !course.price) {
    return res.status(400).json({
      message: "title and price are required",
    });
  }
  courses.push(course);
  res.status(201).json(courses);
});

app.listen(5000, () => {
  console.log("app running on port:5000");
});
