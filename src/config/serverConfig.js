const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/uber",
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379", 
    JWT_SECRET : process.env.JWT_SECRET
}