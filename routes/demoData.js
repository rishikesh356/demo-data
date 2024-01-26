const express = require('express');
const router = express.Router();
const multer = require("multer");
const DemoData = require("../models/demoData");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
router.get('/', async (req,res)=>{try{
  const demoData=await DemoData.find();
  res.json(demoData);
}
catch(error){
  res.status(500).json({ error: error.message });
}})
router.post('/',upload.single('image'),async(req,res)=>{
  try {
      const { description } = req.body;
      const imagePath = req.file.path;
      const newImage = new DemoData({ description, imagePath });
      await newImage.save();
      res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports=router;