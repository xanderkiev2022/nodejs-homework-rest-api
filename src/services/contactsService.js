const { Contact } = require("../db/contactModel");

const getContacts = async (userId, { skip, limit, sort, favorite }) => {
  const query = { owner: userId };
  if (favorite !== undefined) { query.favorite = favorite; }

  const totalContacts = await Contact.countDocuments(query);
  const totalPages = Math.ceil(totalContacts / limit);
  const contacts = await Contact.find(query)
    .populate("owner", "_id email")
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort);
  return { totalContacts, totalPages, contacts };
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
  const contactToEdit = await Contact.findByIdAndUpdate(contactId, data, { new: true }).select({ __v: 0, owner: 0 });
  return contactToEdit;
};
const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
