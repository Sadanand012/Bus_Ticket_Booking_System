export const generateSeats = () => {
  const rows = 15;
  const seatsPerRow = 4;
  const seatLayout = [];

  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C...
    const rowSeats = [];

    for (let j = 1; j <= seatsPerRow; j++) {
      rowSeats.push(`${rowLabel}${j}`);
    }

    seatLayout.push(rowSeats);
  }

  return seatLayout;
};
