const serviceAuth = require("../../src/services/authService");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
    await serviceAuth.registration(email, password);
    res.status(201).json({ message: "Success", data: { message: "Registration successful", }, });

};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await serviceAuth.login(email, password);
  res.status(200).json({message: "Success", data: { token },});
};

module.exports = {
  registration,
  login,
};
