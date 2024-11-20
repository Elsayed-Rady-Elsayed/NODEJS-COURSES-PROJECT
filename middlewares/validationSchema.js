const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("enter valid title")
      .isLength({ min: 5 })
      .withMessage("enter title with more than 5 characters"),
    body("price").notEmpty().withMessage("enter valid price"),
  ];
};
module.exports = {
  validationSchema,
};
