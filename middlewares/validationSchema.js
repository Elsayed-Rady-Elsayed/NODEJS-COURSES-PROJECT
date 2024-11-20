const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("The title field is required.")
      .isLength({ min: 5 })
      .withMessage("The title must be at least 5 characters long."),
    body("price")
      .notEmpty()
      .withMessage("The price field is required.")
      .isFloat({ gt: 0 })
      .withMessage("The price must be a positive number."),
  ];
};

module.exports = {
  validationSchema,
};
