const serviceContacts = require("../../src/services/contactsService");
const mongoose = require("mongoose");
const { NotFoundError } = require("../helpers/errors");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  let { skip = 0, limit = 5 } = req.query;
  limit = limit > 10 ? 10 : parseInt(limit);
  skip = parseInt(skip);
  const contacts = await serviceContacts.getContacts(_id, { skip, limit });
  res.status(200).json({ message: "Success ", data: { skip, limit, contacts } });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) throw new NotFoundError("Not found");      
  else {
    const contact = await serviceContacts.getContactById(contactId);
    res.status(200).json({ message: "Success ", data: { contact } });
  }
};

const add = async (req, res, next) => {
  const { _id } = req.user;
  const data = req.body;
  const newContact = await serviceContacts.addContact(data, _id);
  res.status(201).json({ message: "Contact added ", data: { newContact } });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) throw new NotFoundError("Not found");   
  else {
    const data = req.body;
    const contactToEdit = await serviceContacts.updateContactById(contactId, data);
    res.status(200).json({ message: "Contact was updated", data: { contactToEdit } });
  }
};

// TODO Однакові функції
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) throw new NotFoundError("Not found");   
  else {
    const data = req.body;
    const contactToEdit = await serviceContacts.updateStatusById(contactId, data);
    res.status(200).json({ message: "Favorite status was updated", data: { contactToEdit } });
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) throw new NotFoundError("Not found");
  else {
    await serviceContacts.removeContact(contactId);
    res.status(200).json({ message: "Contact deleted " });
  }
};

module.exports = { getAll, getById, add, update, updateStatus, remove, };
