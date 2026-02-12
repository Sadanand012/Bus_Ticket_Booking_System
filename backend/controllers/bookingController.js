const Booking = require("../models/Booking");
const { validateBooking } = require("../services/bookingValidationService");
const asyncHandler = require("../utils/asyncHandler");
const generateBoardingSequence = require("../services/boardingService");

const createBooking = asyncHandler(async (req, res) => {
  try {
    const { travelDate, mobileNumber, seats } = req.body;

    if (!travelDate || !mobileNumber || !seats?.length) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Validation logic / error handled
    await validateBooking({ travelDate, mobileNumber, seats });

    const booking = new Booking({
      bookingId: crypto.randomUUID(),
      travelDate,
      mobileNumber,
      seats
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

const getBookingsByDate = asyncHandler(async (req, res) => {
  try {
    const { travelDate } = req.query;

    const bookings = await Booking.find({ travelDate }).sort({
      createdAt: 1
    });

    const boardingSequence = generateBoardingSequence(bookings);

    res.json({
      totalBoardingTime: boardingSequence.length * 60,
      bookings: boardingSequence
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

const updateBoardingStatus = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { boarded: req.body.boarded },
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = {
  createBooking,
  getBookingsByDate,
  updateBoardingStatus
};
