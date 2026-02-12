import { toast } from "react-toastify";
import { generateSeats } from "../../utils/generateSeats";
import Seat from "./Seat";

const SeatLayout = ({ bookedSeats, selectedSeats, setSelectedSeats }) => {
  const layout = generateSeats();

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 6) {
        toast.warning("Maximum 6 seats allowed");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div style={busContainer}>
      {/* Driver + Door Row */}
      <div style={topRow}>
        <div style={door}>Door</div>
        <div style={driverSeat}>Driver</div>
      </div>

      {/* Seats */}
      {layout.map((row, index) => (
        <div key={index} style={rowStyle}>
          {/* Left 2 Seats */}
          <div style={seatGroup}>
            {row.slice(0, 2).map((seat) => (
              <Seat
                key={seat}
                seatNumber={seat}
                isBooked={bookedSeats.includes(seat)}
                isSelected={selectedSeats.includes(seat)}
                onClick={() => {
                  toggleSeat(seat);
                }}
              />
            ))}
          </div>

          {/* AISLE */}
          <div style={aisle}></div>

          {/* Right 2 Seats */}
          <div style={seatGroup}>
            {row.slice(2, 4).map((seat) => (
              <Seat
                key={seat}
                seatNumber={seat}
                isBooked={bookedSeats.includes(seat)}
                isSelected={selectedSeats.includes(seat)}
                onClick={() => {
                  toggleSeat(seat);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
const busContainer = {
  border: "2px solid #ccc",
  padding: "10px",
  borderRadius: "12px",
  width: "fit-content",
  margin: "auto",
  background: "#fafafa",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const driverSeat = {
  width: "70px",
  height: "40px",
  background: "black",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  fontSize: "12px",
};

const door = {
  border: "2px dashed green",
  padding: "8px 12px",
  borderRadius: "6px",
  fontWeight: "bold",
  color: "green",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const seatGroup = {
  display: "flex",
  gap: "8px",
};

const aisle = {
  width: "40px",
};

export default SeatLayout;
