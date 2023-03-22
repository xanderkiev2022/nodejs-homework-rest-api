const express = require("express");
const router = express.Router();
const ctrlContact = require("../../src/controllers/contactsController");
const { asyncWrapper } = require("../../src/helpers/apiHelpers");
const { authMiddleware } = require("../../src/middlewares/authMiddleware");
const { validation, add, updateContact, updateFavorite } = require("../../src/middlewares/validationMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(ctrlContact.getAll));
router.get("/:contactId", asyncWrapper(ctrlContact.getById));
router.post("/", validation(add), asyncWrapper(ctrlContact.add));
router.put("/:contactId", validation(updateContact), asyncWrapper(ctrlContact.update));
router.delete("/:contactId", asyncWrapper(ctrlContact.remove));
router.patch("/:contactId/favorite", validation(updateFavorite), asyncWrapper(ctrlContact.update)
);

module.exports = router; 
