import { useState } from "react";
import { createBooking } from "../services/bookingService";

const BookingPage = () => {
  const [travelDate, setTravelDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleBooking = async () => {
    try {
      const payload = {
        travelDate,
        mobileNumber,
        seats: selectedSeats,
      };

      const response = await createBooking(payload);

      alert(`Booking Successful! ID: ${response.bookingId}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>

      <input
        type="date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      <button onClick={handleBooking}>Confirm Booking</button>
      <button onClick={() => setSelectedSeats(["A1", "A2"])}>
        Select Sample Seats
      </button>
    </div>
  );
};

export default BookingPage;
