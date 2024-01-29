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
router.get('/site', async (req,res)=>{try{
  const url = req.query.url;
  const demoData=await DemoData.find({url:url}).sort({Sno:'asc'});
  res.json(demoData);
}
catch(error){
  res.status(500).json({ error: error.message });
}})
router.post('/',upload.single('image'),async(req,res)=>{
  try {
     const {url}=req.body;
      const { description } = req.body;
      const imagePath = req.file.path;
      let Sno=1;
      var exists = false;
      await DemoData.find({}).then(docs=>{
        docs.forEach(doc=>{
          if(doc.url==url)
          {
            exists = true;
          }
        })
      })
      const newImage = new DemoData({url, description, imagePath,Sno });
      
      if (exists){
        return res.status(404).json({messgae:"URL alreay exists"})
      }
      else{
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.patch('/edit/site',upload.single('image'),async(req,res)=>{
  try{

    const url=req.query.url;
    const {description}=req.body;
    const imagePath=req.file.path;
    let Sno=0;
    await DemoData.find({url:url}).then(docs=>{
      docs.forEach(doc=>{
        Sno=doc.Sno;
      })
    })
    Sno=Sno+1;
    const newImage = new DemoData({url, description, imagePath,Sno });
    await newImage.save();
    res.status(201).json({ message: 'Image added to url successfully' });
  }catch(error){
    console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.patch('/edit',async(req,res)=>{
  try{

    const sequence=req.query.seq.split(',');
    console.log(sequence[0] + ' '+sequence[1]+' '+sequence[2]);
    const url=req.query.url;
    let index=0;
    await DemoData.find({url:url}).then(docs=>{
      docs.forEach(doc=>{
        // const newDoc=new DemoData();
        console.log(doc);
        // const Sno = doc.Sno;
        console.log('---');
        doc.Sno=sequence[index];
        // DemoData.updateOne({url:url,Sno:Sno},doc)
        console.log(doc);
        doc.save();
        index++;
      })
    })
    
    res.status(201).json({message:"Sequence updated successfully"})
  }catch(error){
    console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.delete('/site',async(req,res)=>{
  try{

    const url=req.query.url;
    const result=await DemoData.deleteMany({url:url});
    if(!result){
      return res.status(404).send('URL not found');
    }
    return res.status(201).json({message:'URL deleted successfull'})
  }catch(error){
    console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
module.exports=router;