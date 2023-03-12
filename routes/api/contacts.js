const express = require("express");
const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactContactController,
  removeContactController,
} = require("../../src/controllers/contacts.Controller");

router.get("/", getContactsController);
router.get("/:contactId", getContactByIdController);
router.post("/", addContactController);
router.put("/:contactId", updateContactContactController);
router.delete("/:contactId", removeContactController);

module.exports = router;
