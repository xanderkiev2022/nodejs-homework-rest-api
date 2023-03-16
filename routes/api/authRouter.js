const express = require("express");
const router = express.Router();
const ctrlAuth = require("../../src/controllers/authController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");

router.post("/registration", asyncWrapper(ctrlAuth.registration));
router.post("/login", asyncWrapper(ctrlAuth.login));


module.exports = { authRouter: router};
