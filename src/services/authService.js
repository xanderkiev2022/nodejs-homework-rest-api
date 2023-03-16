const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../db/userModel");
const { UnauthorizedError } = require("../helpers/errors");

const secret = process.env.JWT_SECRET;

const authController = require("../controllers/authController");
//TODO move to controllers

const registration = async (email, password) => {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     return res.status(409).json({
  //       status: "error",
  //       code: 409,
  //       message: "Email is already in use",
  //       data: "Conflict",
  //     });
  //   }

  try {
    const newUser = new User({ email, password });
    // newUser.setPassword(password);
    await newUser.save();
  } catch (error) {
    // next(error);
  }
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
   // || !user.validPassword(password)
    throw new UnauthorizedError("Email or password is wrong");
    // return res.status(400).json({
    //   status: "error",
    //   code: 400,
    //   message: "Incorrect login or password",
    //   data: "Bad request",
    // });
  }


  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};

module.exports = {
  registration,
  login,
};
