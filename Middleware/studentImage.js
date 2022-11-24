const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./uploads/student/`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, "image" + Math.random() + file.originalname);
  },
});
let image = multer({
  storage: storage,
});

module.exports = image;
