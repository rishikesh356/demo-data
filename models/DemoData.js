const mongoose=require('mongoose');

const demoSchema = new mongoose.Schema({
    url:String,
    description: String,
    imagePath: String,
    Sno:Number,
  });
  
const DemoData = mongoose.model('demoData', demoSchema);

module.exports=DemoData;