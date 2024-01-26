
const DemoData = require("../models/demoData");

async function addImageData(req,res){
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
}
async function getImageDatas(req,res){
    try{
        const demoData=await DemoData.find();
        res.json(demoData);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
module.exports=addImageData;
module.exports=getImageDatas;