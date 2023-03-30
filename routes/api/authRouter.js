const express = require("express");
const router = express.Router();

// const path = require("path");
// const IMG_DIR = path.join(__dirname, "../../public/avatars");

const ctrlAuth = require("../../src/controllers/authController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { validation, register, login, subscription } = require("../../src/middlewares/validationMiddleware");
const { authMiddleware } = require("../../src/middlewares/authMiddleware");
const { uploadMiddleware } = require("../../src/middlewares/uploadMiddleware");

router.post("/register", validation(register), asyncWrapper(ctrlAuth.registration));
router.post("/login", validation(login), asyncWrapper(ctrlAuth.login));
router.post("/logout", authMiddleware, asyncWrapper(ctrlAuth.logout));
router.post("/current", authMiddleware, asyncWrapper(ctrlAuth.current));
router.patch("/", authMiddleware, validation(subscription), asyncWrapper(ctrlAuth.updateSubscription));
router.patch("/avatars", authMiddleware, uploadMiddleware.single('avatar'), asyncWrapper(ctrlAuth.updateAvatar));
// router.use("/avatars", express.static(IMG_DIR));


module.exports = router;
