const {BookingService,LocationService} = require('../services');
const { io } = require('../index');


//createBooking is for the user
const createBooking = (io) => async (req, res) => {
  try {
    const { source, destination } = req.body;
    //new booking
    const booking = await BookingService.createBooking({ passengerId: req.user._id, source, destination });
    const driverIds = [];

    //finding nearby drivers
    const nearbyDrivers = await BookingService.findNearbyDrivers(source);
    console.log(nearbyDrivers);
    for (const driver of nearbyDrivers) {
        console.log(driver);
        //getting driver socketId
        const driverSocketId = await LocationService.getDriverSocket(driver[0]);
        if (driverSocketId) {
          driverIds.push(driver[0])
          io.to(driverSocketId).emit('newBooking', { bookingId: booking._id, source, destination, fare: booking.fare });
        }
    }
    //notifying the nearby about the booking and storing the id's in the redis
    await LocationService.storeNotifiedDrivers(booking._id,driverId);

    return res.status(201).send({data:booking, success: true, error: null, message: "successfully created booking"});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//confirm booinging is for driver
const confirmBooking = (io) => async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await BookingService.assignDriver(bookingId, req.user._id);
    const notifiedDriverIds = await LocationService.getNotifiedDrivers(bookingId);
    for (const driverId of notifiedDriverIds){
      const driverSocketId = await LocationService.getDriverSocket(driverId);
      if(driverSocketId){
        if(driverId === req.user._id){
          io.to(driverSocketId).emit('rideConfirmed',{bookingId,driverId:req.user._id});
        }
        else{
          io.to(driverSocketId).emit('removeBooking',{bookingId});
        }
      }
    }
    res.status(201).send({data:booking, success: true, error: null, message: "successfully confirmed booking"});

  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = { createBooking, confirmBooking };
