const mongoose=require('mongoose');

const demoSchema = new mongoose.Schema({
    description: String,
    imagePath: String
  });
  
const DemoData = mongoose.model('demoData', demoSchema);

module.exports=DemoData;