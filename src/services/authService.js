const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
require("dotenv").config();
const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError } = require("../helpers/errors");

const secret = process.env.JWT_SECRET;

const registration = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) { throw new ConflictError(`Email ${data.email} is already in use`); }
  const avatar = gravatar.url(data.email, { protocol: "https", s: "250" });
  const result = await User.create({...data, avatarURL: avatar})
  return { email: result.email, subscription: result.subscription, avatarURL: result.avatarURL };
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !await bcrypt.compare(data.password, user.password)) { throw new UnauthorizedError("Email or password is wrong");}

  const payload = { id: user._id, };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  return { token, email: user.email, subscription: user.subscription };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {throw new UnauthorizedError("Not authorized");}
  await User.findByIdAndUpdate(userId, { token: null });
};

const current = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthorizedError("Not authorized");
  }
};

const update = async (userId, newSubscription) => {
  const userToEdit = await User.findByIdAndUpdate(userId,
    { subscription: newSubscription },
    { runValidators: true },
    { new: true }
  ).select({ password: 0, token: 0 });
  return userToEdit;
};

// ПОМИЛКА
const updateAvatar = async (userId, avatarData) => {
  const { path: tempDir, originalname } = avatarData;
  const [filename, extension] = originalname.split(".");
  const id = nanoid();
  const imgDir = path.join(__dirname, "../../public/avatars");
  const imgName = `${filename}_${id}.${extension}`;
  const newDir = path.join(imgDir, imgName);

  try {
    await fs.rename(tempDir, newDir);
    const avatar = await Jimp.read(`public/avatars/${imgName}`);
    // await avatar.writeAsync(imgDir+imgName);
    avatar.resize(250, 250);
    // const avatarURL = path.join("public", "avatars", imgName);
    const avatarURL = path.join(`public/avatars/${imgName}`);
    const result = await User.findByIdAndUpdate(userId, { avatarURL });
    return result;
  } catch (err) {
    await fs.unlink(tempDir);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  update,
  updateAvatar,
};
