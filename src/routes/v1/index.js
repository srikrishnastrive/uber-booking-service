const express = require('express');

const v1Router = express.Router();

const authRoutes = require('./authRoutes');
const bookingRoutes = require('./bookingRoutes');
const driverRoutes = require('./driverRoutes');
const passengerRoutes = require('./passengerRoutes');


v1Router.use('/auth',authRoutes);
v1Router.use('/booking',bookingRoutes);
v1Router.use('/driver',driverRoutes);
v1Router.use('/passenger',passengerRoutes);

module.exports = v1Router;
