const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const apiRouter = require('./routes');
const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/dbConfig');
const {redisConfig} = require('./config/redisConfig')
const  cors = require('cors');


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());



app.use('/api', apiRouter);

server.listen(serverConfig.PORT,async ()=>{
    await dbConfig();
    await redisConfig();
    console.log(`Server started at port ${serverConfig.PORT}`)
})
