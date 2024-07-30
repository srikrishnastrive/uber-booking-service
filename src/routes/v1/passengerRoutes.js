const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const {PassengerController} = require('../../controllers');
const router = express.Router();

router.post('/bookings',authMiddleware,PassengerController.getPassengerBookings);
router.post('/feedback',authMiddleware,PassengerController.provideFeedback);


module.exports  = router;