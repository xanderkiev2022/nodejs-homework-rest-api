const express = require("express");
const router = express.Router();
const ctrlAuth = require("../../src/controllers/authController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { registerValidation, loginValidation } = require("../../src/middlewares/validationMiddleware");
const { authMiddleware } = require("../../src/middlewares/authMiddleware");

router.post("/register", registerValidation, asyncWrapper(ctrlAuth.registration));
router.post("/login", loginValidation, asyncWrapper(ctrlAuth.login));
router.post("/logout", authMiddleware, asyncWrapper(ctrlAuth.logout));
router.post("/current", authMiddleware, asyncWrapper(ctrlAuth.current));

module.exports = { authRouter: router};
