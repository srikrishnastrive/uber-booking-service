const mongoose = require('mongoose');


const connectDB = async() =>{
    try {
       await mongoose.connect(process.env.MANGO_URL,{
            userNewUrlParser : true,
            userUnifiedTopology : true
       });
       console.log("Mango DB Connected");
    } catch (error) {
        console.error('MangoDB connection Error',error);
    }
};

module.exports = connectDB;