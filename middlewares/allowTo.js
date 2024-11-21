const appError = require("../utils/appError");
const { FAIL } = require("../utils/httpStatusText");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("this role is not authorized", 401, FAIL));
    }
    next();
  };
};
