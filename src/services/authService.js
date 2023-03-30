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
  const avatarURL = gravatar.url(data.email, { protocol: 'https', s: '100' });
  const result = await User.create({...data, avatarURL})
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

const updateAvatar = async (userId, avatarData) => {
  const { path: tempDir, originalname } = avatarData;
  try {
    const img = await Jimp.read(tempDir);
    await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE,).writeAsync(tempDir);
    
    const [filename, extension] = originalname.split(".");
    const id = nanoid();
    const imgNameInPublic = `${filename}_${id}.${extension}`;
    const linkToPublicFolder = path.join(__dirname, "../../", "public", "avatars");
    const newDir = path.join(linkToPublicFolder, imgNameInPublic);

    await fs.rename(tempDir, newDir);
    const avatarURL = path.join("public", "avatars", imgNameInPublic);
    await User.findByIdAndUpdate(userId, { avatarURL });
    return avatarURL;
  } catch (err) {
    await fs.unlink(tempDir);
    throw err;
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
