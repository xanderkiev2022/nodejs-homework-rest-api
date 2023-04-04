const express = require("express");
const router = express.Router();

const ctrlAuth = require("../../src/controllers/authController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { validation, register, login, subscription, email} = require("../../src/middlewares/validationMiddleware");
const { authMiddleware } = require("../../src/middlewares/authMiddleware");
const { uploadMiddleware } = require("../../src/middlewares/uploadMiddleware");

router.post("/register", validation(register), asyncWrapper(ctrlAuth.registration));
router.post("/login", validation(login), asyncWrapper(ctrlAuth.login));
router.post("/logout", authMiddleware, asyncWrapper(ctrlAuth.logout));
router.post("/current", authMiddleware, asyncWrapper(ctrlAuth.current));
router.patch("/", authMiddleware, validation(subscription), asyncWrapper(ctrlAuth.updateSubscription));
router.patch("/avatars", authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(ctrlAuth.updateAvatar));
router.get("/verify/:verificationToken", asyncWrapper(ctrlAuth.verify));
router.post("/verify", validation(email), asyncWrapper(ctrlAuth.resendVerify));

module.exports = router;