const express = require('express');
const { BookingController } = require('../../controllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const { io } = require('../../index');
const router = express.Router();




module.exports = (io) => {
    router.post('/',authMiddleware,BookingController.createBooking(io));
    router.post('/confirm',authMiddleware,BookingController.confirmBooking(io));

    return router;
}


