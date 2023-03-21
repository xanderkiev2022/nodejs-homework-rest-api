const { Contact } = require("../db/contactModel");

const getContactsCount = async (userId) => {
  return await Contact.countDocuments({ owner: userId });
};

const getContacts = async (userId, { startIndex, limit, sort }) => {
  const contacts = await Contact.find({ owner: userId })
    .select({ __v: 0, owner: 0 })
    .skip(startIndex)
    .limit(limit)
    .sort(sort);
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
const addContact = async (data, userId) => {
  const newContact = await Contact.create({ ...data, owner: userId });
  return newContact;
};
const updateContactById = async (contactId, data) => {
  const contactToEdit = await Contact.findByIdAndUpdate(
    { _id: contactId },
    data,
    { new: true }
  );
  return contactToEdit;
};
const updateStatusById = async (contactId, data) => {
  const contactToEdit = await Contact.findByIdAndUpdate(
    { _id: contactId },
    data,
    { new: true }
  );
  return contactToEdit;
};
const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusById,
  removeContact,
  getContactsCount,
};
