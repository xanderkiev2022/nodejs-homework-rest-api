const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  password: {type: String, required: [true, "Set password for user"],},
  email: {type: String, required: [true, "Email is required"], unique: true,},
  subscription: {type: String, enum: ["starter", "pro", "business"], default: "starter", },
  token: String,
});

  //Мідлвер на хеш пароля
userSchema.pre('save', async function () {
  if (this.isNew) { this.password = await bcrypt.hash(this.password, 10); }
  //TODO Перевірка пароля у випадку його перезапису, зробити
})

const User = mongoose.model("user", userSchema);

module.exports = { User };

// 
// 


// Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user',
    // }