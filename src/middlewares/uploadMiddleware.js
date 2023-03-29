const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const TMP_DIR = path.join(__dirname, "../../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    // if (extension !== "jpg") {
    //     throw new Error('Wrong type of image, has to be ".jpg"');
    // }
    cb(null, `${filename}_${nanoid()}.${extension}`);
  },
  // limits: { fileSize: 1, },
});

const uploadMiddleware = multer({ storage });

module.exports = {
  uploadMiddleware,
};


