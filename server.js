const app = require("./app");

require("dotenv").config();
const { connectMongo } = require("./src/db/connections");
const { createFolderIsNotExist, uploadDir, folderPublic, folderAvatars } = require("./src/helpers/createFolders");

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
