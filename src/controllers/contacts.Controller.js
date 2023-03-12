const Joi = require("joi");

const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "Success ", data: { contacts } });
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) res.status(200).json({ message: "Success ", data: { contact } });
};

const addContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = await contactValidation.validateAsync(
      req.body
    );
    const newContact = await addContact(name, email, phone);
    res.status(201).json({ message: "Contact added ", data: { newContact } });
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const updateContactContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactValidation.validateAsync(req.body);
    const contactToEdit = await updateContact(contactId, req.body);
    if (!contactToEdit) {
      res.status(404).json({ message: "Not found" });
    } else {
      res
        .status(200)
        .json({ message: "Contact was updated", data: { contactToEdit } });
    }
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDel = await getContactById(contactId);
  await removeContact(contactId);
  if (!contactToDel) res.status(404).json({ message: "Not found" });
  if (contactToDel) res.status(200).json({ message: "Contact deleted " });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactContactController,
  removeContactController,
};
