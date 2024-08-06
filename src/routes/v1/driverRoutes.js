const express = require('express');
const { DriverController } = require('../../controllers');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/bookings',authMiddleware,DriverController.getDriverBookings);
router.get('/location',authMiddleware,DriverController.updateLocation);

module.exports = router;
