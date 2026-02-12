const getSeatRowNumber = (seat) => {
  const rowLetter = seat.charAt(0);
  return rowLetter.charCodeAt(0) - 64;
};

const getFarthestSeatRow = (seats = []) => {
  if (!seats.length) return 0;

  return Math.max(...seats.map(getSeatRowNumber));
};

const generateBoardingSequence = (bookings) => {
  return bookings
    .map((booking) => {
      const farthestRow = getFarthestSeatRow(booking.seats);

      return {
        ...booking.toObject(),
        boardingPriority: farthestRow
      };
    })
    .sort((a, b) => {
      if (b.boardingPriority === a.boardingPriority) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      return b.boardingPriority - a.boardingPriority;
    })
    .map((booking, index) => ({
      sequenceNumber: index + 1,
      ...booking
    }));
};

module.exports = generateBoardingSequence;
