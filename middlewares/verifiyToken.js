const jwt = require("jsonwebtoken");
const { FAIL } = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authToken =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authToken) {
    const error = appError.create("token is required", 401, FAIL);
    return next(error);
  }
  const token = authToken.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    const error = appError.create("error with token", 401, FAIL);
    return next(error);
  }
};
module.exports = { verifyToken };
