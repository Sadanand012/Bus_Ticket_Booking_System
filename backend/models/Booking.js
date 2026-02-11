const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true
    },

    travelDate: {
      type: Date,
      required: true
    },

    mobileNumber: {
      type: String,
      required: true
    },

    seats: [
      {
        type: String,
        required: true
      }
    ],

    boarded: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
