const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "Success ", data: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) res.status(200).json({ message: "Success ", data: { contact } });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) res.status(400).json({ message: "Missing required name field" });
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ message: "Contact added ", data: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDel = await getContactById(contactId);
  await removeContact(contactId);  
  if (!contactToDel) res.status(404).json({ message: "Contact wasn't found" });
  if (contactToDel)  res.status(200).json({ message: "Contact deleted " });
  
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  console.log("req.body :>> ", req.body);
  if ((Object.keys(req.body).length === 0)) res.status(400).json({ message: "missing fields" });
  else {
    const contactToEdit = await updateContact(contactId, req.body);
    if (!contactToEdit) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ message: "Contact was updated", data: { contactToEdit } });
    }
  }});

module.exports = router;
