const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError } = require("../helpers/errors");

const secret = process.env.JWT_SECRET;

const registration = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) { throw new  ConflictError(`Email ${data.email} is already in use`); }
  const result = await User.create(data)
  return { email: result.email, subscription: result.subscription };
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !await bcrypt.compare(data.password, user.password)) { throw new UnauthorizedError("Email or password is wrong");}

  const payload = { _id: user._id, };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  return { token, email: user.email, subscription: user.subscription };
};

const logout = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) {throw new UnauthorizedError("Not authorized");}
  await User.findByIdAndUpdate(_id, { token: null });
};

const current = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) {
    throw new UnauthorizedError("Not authorized");
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
};
