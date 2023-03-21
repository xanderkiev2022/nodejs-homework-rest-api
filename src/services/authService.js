const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError } = require("../helpers/errors");

const secret = process.env.JWT_SECRET;

const registration = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) { throw new ConflictError(`Email ${email} is already in use`); }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
  } catch (error) {

  }
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  const payload = { _id: user._id, };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logout = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) {throw new UnauthorizedError("Not authorized");}
  await User.findByIdAndUpdate(_id, { token: null });
};

module.exports = {
  registration,
  login,
  logout,
};
