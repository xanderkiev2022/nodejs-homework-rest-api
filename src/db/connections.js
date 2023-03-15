const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    return client;
  } catch (error) {
    console.log("Database connection error: ", error);
    process.exit(1);
  }
};

module.exports = { connectMongo };
