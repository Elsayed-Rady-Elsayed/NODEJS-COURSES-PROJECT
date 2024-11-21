const asyncWrapper = require("../middlewares/asyncWrapper");

const bcrypt = require("bcrypt");

const user = require("../models/user_model");

const appError = require("../utils/appError");

const { SUCCESS, FAIL } = require("../utils/httpStatusText");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await user
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const userFind = await user.findOne({ email: email });
  if (userFind) {
    const error = appError.create("this user already exist", 400, FAIL);
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new user({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ status: SUCCESS, data: { newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appError.create("enter your email and password", 400, FAIL);
    return next(error);
  }
  const findUser = await user.findOne({ email: email });
  if (!findUser) {
    const error = appError.create("user not found", 400, FAIL);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, findUser.password);
  if (!matchedPassword) {
    const error = appError.create("password is wrong", 400, FAIL);
    return next(error);
  }
  if (findUser && matchedPassword) {
    res.status(201).json({ status: SUCCESS, data: { findUser } });
  } else {
    const error = appError.create("something went wrong", 400, FAIL);
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
