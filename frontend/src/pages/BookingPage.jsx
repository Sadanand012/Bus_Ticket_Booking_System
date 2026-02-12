import { useEffect, useState } from "react";
import { createBooking, getBookingsByDate } from "../services/bookingService";
import SeatLayout from "../components/booking/SeatLayout";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { toast } from "react-toastify";

const BookingPage = () => {
  const [travelDate, setTravelDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!travelDate) return;

    const fetchBookedSeats = async () => {
      const bookings = await getBookingsByDate(travelDate);

      const seats = bookings.flatMap((b) => b.seats);
      setBookedSeats(seats);
      setSelectedSeats([]);
    };

    fetchBookedSeats();
  }, [travelDate]);

  const openConfirmation = () => {
    if (!travelDate || !mobileNumber || selectedSeats.length === 0) {
      toast.error("Please select date, mobile number and seats");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Please enter valid 10 digit mobile number");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = async () => {
    try {
      setLoading(true);

      const payload = {
        travelDate,
        mobileNumber,
        seats: selectedSeats,
      };

      const response = await createBooking(payload);
      if (response) {
        toast.success("Booking confirmed");
      }
      const bookings = await getBookingsByDate(travelDate);
      setBookedSeats(bookings.flatMap((b) => b.seats));
      setShowModal(false);
      setSelectedSeats([]);
    } catch (error) {
      const message = error?.response?.data?.message || "Booking failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Book Ticket</h2>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Travel Date</label>
        <input
          style={inputStyle}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={travelDate}
          onChange={(e) => {
            setTravelDate(e.target.value);
          }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Mobile Number</label>
        <input
          style={inputStyle}
          type="tel"
          placeholder="Enter 10 digit mobile number"
          value={mobileNumber}
          maxLength={10}
          onChange={(e) => {
            setMobileNumber(e.target.value.replace(/\D/g, ""));
          }}
        />
      </div>
      <SeatLayout
        bookedSeats={bookedSeats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <h4>Selected Seats: {selectedSeats.join(", ")}</h4>

      <button
        onClick={openConfirmation}
        disabled={!selectedSeats.length}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          cursor: !selectedSeats.length ? "not-allowed" : "pointer",
          backgroundColor: !selectedSeats.length ? "#ccc" : "#2563eb",
          color: "white",
          transition: "all 0.2s ease",
        }}
      >
        Confirm Booking
      </button>
      {showModal && (
        <ConfirmationModal
          title="Confirm Booking"
          message={`Confirm seats ${selectedSeats.join(", ")} for ${travelDate}?`}
          onConfirm={confirmBooking}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",
  color: "#374151",
};

const inputStyle = {
  padding: "11px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
};

export default BookingPage;
