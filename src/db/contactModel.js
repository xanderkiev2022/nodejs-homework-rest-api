const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
});

const Contact = mongoose.model("contact", contactsSchema);

module.exports = { Contact };