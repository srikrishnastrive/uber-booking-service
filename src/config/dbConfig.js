const mongoose = require('mongoose');
const ServerConfig = require('./serverConfig');


const connectDB = async () => {
  try {
    await mongoose.connect(ServerConfig.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
