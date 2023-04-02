const fs = require("fs").promises;
const path = require("path");

const uploadDir = path.join(process.cwd(), "tmp");
const folderPublic = path.join(process.cwd(), "public");
const folderAvatars = path.join(folderPublic, "avatars");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = {
  createFolderIsNotExist,
  uploadDir,
  folderPublic,
  folderAvatars,
};