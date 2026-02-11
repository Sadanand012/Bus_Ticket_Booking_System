import { useState } from "react";
import {
  getBookingsByDate,
  updateBoardingStatus,
} from "../services/bookingService";

const BookingListPage = () => {
  const [travelDate, setTravelDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getBookingsByDate(travelDate);
      setBookings(data);
    } catch (error) {
      alert("Failed to fetch bookings");
    }
  };

  const handleBoarding = async (id, boarded) => {
    try {
      await updateBoardingStatus(id, boarded);
      fetchBookings();
    } catch (error) {
      alert("Failed to update boarding");
    }
  };

  return (
    <div>
      <h2>Booking List</h2>

      <input
        type="date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
      />

      <button onClick={fetchBookings}>Search</button>

      <table border="1">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Seats</th>
            <th>Mobile</th>
            <th>Boarding</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.bookingId}</td>
              <td>{booking.seats.join(", ")}</td>
              <td>
                <a href={`tel:${booking.mobileNumber}`}>📞</a>
              </td>
              <td>
                <button
                  onClick={() => handleBoarding(booking._id, !booking.boarded)}
                >
                  {booking.boarded ? "Boarded" : "Mark Boarded"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingListPage;
