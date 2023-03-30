// const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
    filename: (req, file, cb) => {
    cb(null, file.originalname );
  },
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


