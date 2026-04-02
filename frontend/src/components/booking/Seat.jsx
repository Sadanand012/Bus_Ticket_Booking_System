const Seat = ({ seatNumber, isBooked, isSelected, onClick }) => {
  const getColor = () => {
    if (isBooked) return "gray";
    if (isSelected) return "green";
    return "white";
  };

  return (
    <div
      onClick={!isBooked ? onClick : undefined}
      style={{
        width: 40,
        height: 40,
        border: "2px solid black",
        margin: 5,
        textAlign: "center",
        lineHeight: "40px",
        cursor: isBooked ? "not-allowed" : "pointer",
        backgroundColor: getColor(),
      }}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
