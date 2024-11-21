const jwt = require("jsonwebtoken");
const { FAIL } = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authToken =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authToken.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const error = appError.create("error with token", 404, FAIL);
    return next(error);
  }
};
module.exports = { verifyToken };
