const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const userRoutes = require('./routes/users');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;
const demoDataRoutes=require('./routes/demoData');
const dotenv = require("dotenv");
var cors = require('cors')
dotenv.config();


// const corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // enable set cookie with credentials
//   optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// Middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/demoData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); 

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));


// Define routes
app.use('https://guide-data.onrender.com/upload',demoDataRoutes)
app.use('/users',userRoutes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
