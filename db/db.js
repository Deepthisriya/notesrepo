const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
// Replace 'YOUR_CONNECTION_STRING' with your actual MongoDB connection string
const MONGODB_URI = process.env.MONGO_URI;

module.exports = () => {
    // Your database connection logic here
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
  
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
  
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  };