const serviceAuth = require("../../src/services/authService");

const registration = async (req, res, next) => {
  const data = req.body;
  const result = await serviceAuth.registration(data);
  res.status(201).json({ message: "Created", user: { result } });
};

const login = async (req, res, next) => {
  const data = req.body;
  const result = await serviceAuth.login(data);
  res.status(200).json({ message: "Success login", token: result.token, user: { eamil: result.email, subscription: result.subscription },});
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

module.exports = {
  registration,
  login,
  logout,
  current,
};
