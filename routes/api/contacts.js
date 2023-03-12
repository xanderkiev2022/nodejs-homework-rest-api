const express = require("express");
const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
} = require("../../src/controllers/contactsController");


// const modelsMiddelware = require("../../src/middlewares/models");

// const { asyncWrapper } = require("../../src/helpers/apiHelpers");

// router.use(modelsMiddelware);

router.get("/", getContactsController);
router.get("/:contactId", getContactByIdController);
router.post("/", addContactController);
router.put("/:contactId", updateContactController);
router.delete("/:contactId", removeContactController);
router.patch("/:contactId/favorite", updateStatusContactController);

module.exports = router;
