const Joi = require("joi");
const { Contact } = require("../db/contactModel");

const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().required(),
});

const favoriteValidation = Joi.object({
  favorite: Joi.bool().required().messages({ "any.required": "Missing field favorite" }),
});

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(200).json({ message: "Success ", data: { contacts } });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) res.status(200).json({ message: "Success ", data: { contact } });
};

const add = async (req, res, next) => {
  try {
    const data = await contactValidation.validateAsync(req.body);
    const newContact = await Contact.create(data);
    res.status(201).json({ message: "Contact added ", data: { newContact } });
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactValidation.validateAsync(req.body);
    const contactToEdit = await Contact.findByIdAndUpdate({ _id: contactId }, data, { new: true });
    if (!contactToEdit) { res.status(404).json({ message: "Not found" }); }
    else {res.status(200).json({ message: "Contact was updated", data: { contactToEdit } });}
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await favoriteValidation.validateAsync(req.body);
    const contactToEdit = await Contact.findByIdAndUpdate({ _id: contactId }, data, { new: true });
    if (!contactToEdit) {res.status(404).json({ message: "Not found" });}
    else {res.status(200).json({ message: "Favorite status was updated", data: { contactToEdit } });}
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDel = await Contact.findOne({ _id: contactId });
  await Contact.findByIdAndRemove({ _id: contactId });
  if (!contactToDel) res.status(404).json({ message: "Not found" });
  if (contactToDel) res.status(200).json({ message: "Contact deleted " });
};

module.exports = { getAll, getById, add, update, updateStatus, remove, };
