const express = require('express');

const router = express.Router();

router.get('/bookings',getDriverBookings);
router.get('/location',updateLocation);

module.exports = router;