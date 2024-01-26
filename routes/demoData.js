const express = require('express');
const addImageData = require('../controllers/demoDataController');
const router = express.Router();
const multer = require("multer");
const getImageDatas = require('../controllers/demoDataController');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
router.get('/',getImageDatas)
router.post('/',upload.single('image'),addImageData)

module.exports=router;