const express = require('express');

const router = express.Router();

module.exports = (io) => {
    router.post('/bookings',getPassegerBookings(io));
    router.post('/feedback',provideFeedback(io));

    return router;
}