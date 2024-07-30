const Booking = require('../models/booking');

const {BookingRepository } = require('../repositories');


const getPassengerBookings = async (passengerId) => {
    return Booking.find({passenger:passengerId});
}

const provideFeedback = async (passengerId,bookingId,rating,feedback) =>{
    const booking = await BookingRepository.findBooking({_id:bookingId,passenger:passengerId});
    if(!booking) throw new Error('Booking not found');
    booking.rating = rating;
    booking.feedBack = feedback;
    await booking.save();
}

module.exports = {getPassengerBookings,provideFeedback};