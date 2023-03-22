const serviceContacts = require("../../src/services/contactsService");
const mongoose = require("mongoose");
const { NotFoundError } = require("../helpers/errors");

const getAll = async (req, res, next) => {

  const { _id } = req.user;
  let { page = 1, limit = 20, sort, favorite } = req.query;
  limit = limit > 20 ? 20 : parseInt(limit);
  const skip = (page - 1) * limit;
  const totalContacts = await serviceContacts.getContactsCount(_id);
  const totalPages = Math.ceil(totalContacts / limit);
  const contacts = await serviceContacts.getContacts(_id, {skip, limit, sort, favorite});
  res.status(200).json({ message: "Success", data: { page, totalContacts, totalPages, limit, sort, contacts } });
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
    res.status(200).json({ message: "Update was done successfully", data: { contactToEdit } });
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

module.exports = { getAll, getById, add, update, remove, };
