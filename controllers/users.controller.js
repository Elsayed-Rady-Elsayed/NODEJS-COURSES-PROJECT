const asyncWrapper = require("../middlewares/asyncWrapper");

const user = require("../models/user_model");
const { SUCCESS } = require("../utils/httpStatusText");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await user.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { users } });
});

const register = () => {};

const login = () => {};

module.exports = {
  getAllUsers,
  register,
  login,
};
