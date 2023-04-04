const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
require("dotenv").config();
const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError, NotFoundError, ValidationError } = require("../helpers/errors");
const { uploadToGoogleStorage } = require("../../google-storage");
const { sendEmail } = require("../helpers/sendEmail");

const { JWT_SECRET, BASE_URL } = process.env;

const registration = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) { throw new ConflictError(`Email ${data.email} is already in use`); }
  const avatarURL = gravatar.url(data.email, { protocol: 'https', s: '100' });
  const verificationToken = nanoid();
  
  const verifyEmail = {
    to: `${data.email}`,
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `Verification link: ${BASE_URL}/api/users/verify/${verificationToken}`,
  };
  sendEmail(verifyEmail);

  const result = await User.create({ ...data, avatarURL, verificationToken });
  return { email: result.email, subscription: result.subscription, avatarURL: result.avatarURL };
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !await bcrypt.compare(data.password, user.password)) { throw new UnauthorizedError("Email or password is wrong");}

  const payload = { id: user._id, };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    email: user.email,
    subscription: user.subscription,
  };
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
    uploadToGoogleStorage(imgNameInPublic, newDir).catch(console.error);;

    const avatarURL = `${BASE_URL}/api/users/avatars/${imgNameInPublic}`;
    await User.findByIdAndUpdate(userId, { avatarURL });
    return avatarURL;
  } catch (err) {
    await fs.unlink(tempDir);
    throw err;
  }
};

const verifyEmail = async (verificationToken) => { 
  const user = await User.findOne({verificationToken});
  if (!user) throw new NotFoundError("User not found");
  await User.findByIdAndUpdate(
    user._id,
    { verify: true, $unset: { verificationToken: "" } },
    { new: true }
  );
};

const resendVerifyEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("User not found");
  if (user.verify) throw new ValidationError("Verification has already been passed");

  const verifyEmail = {
    to: `${user.email}`,
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `Verification link: ${BASE_URL}/api/users/verify/${user.verificationToken}`,
  };
  sendEmail(verifyEmail);
};

module.exports = {
  registration,
  login,
  logout,
  current,
  update,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
