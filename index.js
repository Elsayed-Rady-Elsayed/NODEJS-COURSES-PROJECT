const express = require("express");

const app = express();

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
  res.json(course);
});

app.listen(5000, () => {
  console.log("app running on port:5000");
});
