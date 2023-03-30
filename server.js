const app = require("./app");
const fs = require('fs').promises;
const path = require('path');
require("dotenv").config();
const { connectMongo } = require("./src/db/connections");

const uploadDir = path.join(process.cwd(), 'tmp');
const folderPublic = path.join(process.cwd(), 'public');
const folderAvatars = path.join(folderPublic, 'avatars');

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const satrt = async () => {
  try {
    await connectMongo();

    await app.listen(process.env.PORT, (error) => {
      if (error) console.error(`Error at server lunch: ${error.message}`);
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    })
    await createFolderIsNotExist(uploadDir);
    await createFolderIsNotExist(folderPublic);
    await createFolderIsNotExist(folderAvatars);
  } catch (error) {
    console.error(`Failed to lunch application with error: ${error.message}`);
  }
};

satrt();
