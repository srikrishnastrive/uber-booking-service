const locationService = require('./locationService');
const {BookingRepository} = require('../repositories');
const {haversineDistance} = require('../utils/distance');

const BASIC_FARE = 50;
const RATE_PER_KM = 12;

const createBooking = async ({passengerId,source,destination}) =>{
    const distance = haversineDistance(source.latitude, source.longitude, destination.latitude, destination.longitude);
    console.log(distance);
    const fare = BASIC_FARE + (distance * RATE_PER_KM);
    console.log(fare);
    const bookingData = {
      passenger: passengerId,
      source,
      destination,
      fare,
      status: 'pending'
    };
    
    const booking = BookingRepository.createBooking(bookingData);
    return booking;
}

const findNearbyDrivers = async (location, radius = 5) => {
    const longitude = parseFloat(location.latitude);
    const latitude = parseFloat(location.longitude);
  
    // Ensure the radius is a number
    const radiusKm = parseFloat(radius);
  
    if (isNaN(longitude) || isNaN(latitude) || isNaN(radiusKm)) {
      throw new Error('Invalid coordinates or radius');
    }
  
    const nearbyDrivers = await locationService.findNearbyDrivers(longitude, latitude, radiusKm);
  
    return nearbyDrivers;
  };

  
const assignDriver = async (bookingId, driverId) => {
    const booking = await BookingRepository.upadateBookingStatus(bookingId, driverId, 'confirmed');
    if (!booking) throw new Error('Booking already confirmed or does not exist');
    return booking;
  };


  module.exports = { createBooking, findNearbyDrivers, assignDriver };
