const app = require("./app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connections");

const satrt = async () => {
  try {
    const test = await connectMongo();
    const contacts = await test.find({}).toArray();
    console.log("contacts1 :>> ", contacts);

    app.listen(process.env.PORT, (error) => {
      if (error) console.error(`Error at server lunch: ${error.message}`);
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(`Failed to lunch application with error: ${error.message}`);
  }
};

satrt();
