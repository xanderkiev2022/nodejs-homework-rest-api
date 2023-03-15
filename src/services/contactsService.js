const { Contact } = require("../db/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};
const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};
const addContact = async (data) => {
  const newContact = await Contact.create(data);
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
};
