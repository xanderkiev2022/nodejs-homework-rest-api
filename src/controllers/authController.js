const serviceAuth = require("../../src/services/authService");

const registration = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
    await serviceAuth.registration(email, password);
    res.status(201).json({ message: "Created", user: { email, subscription } });
};

const login = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const token = await serviceAuth.login(email, password);
  res.status(200).json({ message: "Success login", token, user: { email, subscription } });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await serviceAuth.logout(_id);
  res.status(204).json();
};

module.exports = {
  registration,
  login,
  logout,
};
