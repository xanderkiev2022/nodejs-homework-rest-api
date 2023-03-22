const express = require("express");
const router = express.Router();
const ctrlAuth = require("../../src/controllers/authController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { validation, register, login } = require("../../src/middlewares/validationMiddleware");
const { authMiddleware } = require("../../src/middlewares/authMiddleware");

router.post("/register", validation(register), asyncWrapper(ctrlAuth.registration));
router.post("/login", validation(login), asyncWrapper(ctrlAuth.login));
router.post("/logout", authMiddleware, asyncWrapper(ctrlAuth.logout));
router.post("/current", authMiddleware, asyncWrapper(ctrlAuth.current));
router.patch("/", authMiddleware, asyncWrapper(ctrlAuth.updateSubscription));


module.exports = router;
