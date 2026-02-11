const generateSeatLayout = () => {
  const rows = 15;
  const seatsPerRow = 4;
  const seatLayout = [];

  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode(65 + i); // A, B, C...

    for (let j = 1; j <= seatsPerRow; j++) {
      seatLayout.push(`${rowLetter}${j}`);
    }
  }

  return seatLayout;
};

module.exports = generateSeatLayout;
