const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v1 } = require('uuid');
const AppError = require('./utils/appError');
const { catchAsync } = require('./utils/helpers');
const { promisify } = require('util');

const createFolder = promisify(fs.mkdir);

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const upload = path.join(__dirname, 'uploads');
    const uploadPath = path.join(__dirname, 'uploads', req.body.productFolder);
    if (!fs.existsSync(upload)) {
      await createFolder(upload);
    }
    if (!fs.existsSync(uploadPath)) {
      await createFolder(uploadPath);
      cb(null, uploadPath);
    } else {
      cb(null, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype);
    const id = v1();
    req.files.id = id;
    cb(null, id + '-' + file.originalname);
  },
});

exports.upload = multer({ storage });
