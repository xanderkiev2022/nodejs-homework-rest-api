const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

async function uploadToGoogleStorage(fileName, filePath) {
  await storage.bucket(bucketName).upload(filePath, { destination: `public/avatars/${fileName}` })
  await storage.bucket(bucketName).file(`public/avatars/${fileName}`).makePublic();
  console.log(`${fileName} uploaded to google storage`);
  console.log(`https://storage.googleapis.com/${bucketName}/public/avatars/${fileName}`)
}

module.exports = {
  uploadToGoogleStorage,
};
