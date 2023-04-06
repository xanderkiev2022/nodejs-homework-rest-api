const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    password: { type: String, required: [true, "Set password for user"] },
    email: { type: String, required: [true, "Email is required"], unique: true, },
    subscription: { type: String, enum: ["starter", "pro", "business"], default: "starter", },
    token: { type: String, default: null },
    avatarURL: { type: String, required: true },
    verify: { type: Boolean, default: false },
    verificationToken: {type: String, required: [true, 'Verify token is required']}
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isNew) { this.password = await bcrypt.hash(this.password, 10); }
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
