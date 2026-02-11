const Booking = require("../models/Booking");
const generateSeatLayout = require("../utils/seatGenerator");

const getBookedSeatsByDate = async (travelDate) => {
  const bookings = await Booking.find({ travelDate });

  let bookedSeats = [];

  bookings.forEach((booking) => {
    bookedSeats = bookedSeats.concat(booking.seats);
  });

  return bookedSeats;
};

const getAvailableSeatsByDate = async (travelDate) => {
  const allSeats = generateSeatLayout();
  const bookedSeats = await getBookedSeatsByDate(travelDate);

  const availableSeats = allSeats.filter(
    (seat) => !bookedSeats.includes(seat)
  );

  return availableSeats;
};

module.exports = {
  getBookedSeatsByDate,
  getAvailableSeatsByDate
};
