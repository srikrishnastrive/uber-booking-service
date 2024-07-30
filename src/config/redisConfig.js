const redis = require('redis');

const ServerConfig = require('./serverConfig');

const redisClient = redis.createClient({
    url: ServerConfig.REDIS_URL,
})

redisClient.on('connect',()=>{
    console.log('Connected to redis');
})

redisClient.on('error',(err)=>{
    console.error('Redis connection error');
})

const redisConfig = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected');
    } catch (err) {
        console.error('Error connecting Redis client:', err);
    }
};

module.exports = redisConfig;