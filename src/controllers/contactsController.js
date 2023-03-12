const Joi = require("joi");
const { connectMongo } = require("../db/connections");
const ObjectId = require("mongodb").ObjectId;

const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const getContactsController = async (req, res, next) => {
  const data = await connectMongo();
  const contacts = await data.find({}).toArray();
  res.status(200).json({ message: "Success ", data: { contacts } });
};

const getContactByIdController = async (req, res, next) => {
  const data = await connectMongo();
  const { contactId } = req.params;
  const contact = await data.findOne({ _id: new ObjectId(contactId) });
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) res.status(200).json({ message: "Success ", data: { contact } });
};

const addContactController = async (req, res, next) => {
  const data = await connectMongo();
  try {
    const {
      name,
      email,
      phone,
      favorite = false,
    } = await contactValidation.validateAsync(req.body);
    const newContact = await data.insertOne({ name, email, phone, favorite });
    res.status(201).json({ message: "Contact added ", data: { newContact } });
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const updateContactController = async (req, res, next) => {
  const data = await connectMongo();
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } =
      await contactValidation.validateAsync(req.body);
    const contactToEdit = await data.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: { name, email, phone, favorite } }
    );
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

const updateStatusContactController = async (req, res, next) => {
  const data = await connectMongo();
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contactToEdit = await data.updateOne(
      { _id: new ObjectId(contactId) },
      { $set: { favorite } }
    );
    if (!favorite) {res.status(400).json({ message: "Missing field favorite" });}
    if (!contactToEdit) { res.status(404).json({ message: "Not found" }); }
    else {res.status(200).json({ message: "Contact was updated", data: { contactToEdit } });}
  } catch (err) {
    res.status(400).json({ message: err.details[0].message });
  }
};

const removeContactController = async (req, res, next) => {
  const data = await connectMongo();
  const { contactId } = req.params;
  const contactToDel = await data.findOne({ _id: new ObjectId(contactId) });
  await data.deleteOne({ _id: new ObjectId(contactId) });
  if (!contactToDel) res.status(404).json({ message: "Not found" });
  if (contactToDel) res.status(200).json({ message: "Contact deleted " });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusContactController,
  removeContactController,
};
