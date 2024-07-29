const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    passenger : {type: mongoose.Schema.Types.ObjectId, ref:'user'},
    driver : {type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
    source : {
        latitude : {
            type : Number,
        },
        longitude :{
            type : Number
        }
    },
    destination :{
        latitude : {
            type : Number,
        },
        longitude :{
            type : Number
        }
    },
    Fare : String,
    status : {type: String, enum:['pending','confirmed','completed','cancelled'],default:'pending'},
    rating : Number,
    feedBack : String
});

const Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking;