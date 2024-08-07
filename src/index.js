const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const apiRouter = require('./routes');
const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/dbConfig');
const {redisConfig} = require('./config/redisConfig')
const  cors = require('cors');
const socketIo = require('socket.io');
const locationService = require('./services/locationService');



const app = express();
const server = http.createServer(app);

const io = socketIo(server,{
    cors:{
        origin: "http://localhost:8000",
        methods:["GET","POST"]
    }
})

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

io.on('connection',(socket) => {
    socket.on('registerDriver',async(driverId)=>{
        await locationService.setDriverSocket(driverId,socket.id)
    })
    socket.on('disconnect',async ()=>{
        const driverId = await locationService.getDriverSocket(`driver:${driverId}`)
        if(driverId){
            await locationService.deleteDriverSocket(driverId)
        }
    })
})
