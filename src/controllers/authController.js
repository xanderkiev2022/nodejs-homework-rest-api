const serviceAuth = require("../../src/services/authService");
const { ValidationError } = require("../helpers/errors");

const registration = async (req, res, next) => {
  const data = req.body;
  const result = await serviceAuth.registration(data);
  res.status(201).json({ message: "Created", user: { result } });
};

const login = async (req, res, next) => {
  const data = req.body;
  const result = await serviceAuth.login(data);
  res
    .status(200)
    .json({
      message: "Success login",
      token: result.token,
      user: { email: result.email, subscription: result.subscription },
    });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await serviceAuth.logout(_id);
  res.status(204).json();
};

const current = async (req, res, next) => {
  const { _id, email, subscription } = req.user;
  await serviceAuth.current(_id);
  res.status(200).json({ message: "OK", user: { email, subscription } });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await serviceAuth.update(_id, subscription);
  res
    .status(200)
    .json({ message: "Subscription was updated", user: { result } });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const avatarData = req.file;
  if (!avatarData) throw new ValidationError("Wrong type of image");
  const avatarURL = await serviceAuth.updateAvatar(_id, avatarData);
  res.status(200).json({ message: "Avatar was updated", avatarURL });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
};
