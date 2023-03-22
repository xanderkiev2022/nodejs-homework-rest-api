const { Contact } = require("../db/contactModel");

const getContactsCount = async (userId) => {
  return await Contact.countDocuments({ owner: userId });
};

const getContacts = async (userId, { skip, limit, sort, favorite }) => {
  const query = { owner: userId };
  if (favorite !== undefined) { query.favorite = favorite; }

  const totalFoundContacts = await Contact.countDocuments(query);
  const contacts = await Contact.find(query)
    .populate("owner", "_id email")
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort);
  return { totalFoundContacts, contacts };
};
const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId).select({ __v: 0, owner: 0 });
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
  ).select({ __v: 0, owner: 0 });
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
  removeContact,
  getContactsCount,
};
