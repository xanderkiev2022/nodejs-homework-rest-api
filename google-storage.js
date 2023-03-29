const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const storage = new Storage();
const bucketName = "mogvai";
// const filePath = "./tmp/downloaded_img.jpg";
// const fileName = "20_g_ozreldkelp9a31dy9bh.jpg";

async function googleStorage(fileName, filePath) {
  await storage.bucket(bucketName).upload(filePath, { destination: fileName });
    // .file(fileName)
    // .download({ destination: filePath });
  console.log(`${fileName} downloaded to ${filePath}`);
}

googleStorage().catch(console.error);

module.exports = {
  googleStorage,
};
