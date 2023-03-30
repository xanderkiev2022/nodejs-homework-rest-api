// const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // const [filename, extension] = file.originalname.split(".");
    // if (extension !== "jpg") {
    //     throw new Error('Wrong type of image, has to be ".jpg"');
    // }
    // cb(null, `${filename}_${nanoid()}.${extension}`);
    cb(null, file.originalname );
  },
  // limits: { fileSize: 1 },
});

const uploadMiddleware = multer({ 
  storage, 
  limits: { fileSize: 2000000 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {  
      cb(null, true); return;}
      cb(null, false)
  }, 
});

module.exports = {
  uploadMiddleware,
};


