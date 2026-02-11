const Booking = require("../models/Booking");
const generateSeatLayout = require("../utils/seatGenerator");
const { getBookedSeatsByDate } = require("./seatService");

const validateBooking = async ({ travelDate, mobileNumber, seats }) => {
  // Check max 6 seats per mobile per day
  const existingBookings = await Booking.find({
    travelDate,
    mobileNumber
  });

  let totalSeatsBooked = 0;

  existingBookings.forEach((booking) => {
    totalSeatsBooked += booking.seats.length;
  });

  if (totalSeatsBooked + seats.length > 6) {
    throw new Error("Maximum 6 seats allowed per mobile number per day");
  }

  // Validate seat names
  const validSeats = generateSeatLayout();

  seats.forEach((seat) => {
    if (!validSeats.includes(seat)) {
      throw new Error(`Invalid seat selected: ${seat}`);
    }
  });

  // Check seat availability
  const bookedSeats = await getBookedSeatsByDate(travelDate);

  seats.forEach((seat) => {
    if (bookedSeats.includes(seat)) {
      throw new Error(`Seat already booked: ${seat}`);
    }
  });
};

module.exports = {
  validateBooking
};
