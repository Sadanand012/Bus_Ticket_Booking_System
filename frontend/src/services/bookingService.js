import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/bookings";

// Create Booking
export const createBooking = async (data) => {
  const response = await axios.post(API_BASE_URL, data);
  return response.data;
};

// Get Booking List
export const getBookingsByDate = async (travelDate) => {
  const response = await axios.get(`${API_BASE_URL}?travelDate=${travelDate}`);
  return response.data;
};

// Update Boarding Status
export const updateBoardingStatus = async (id, boarded) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}/board`, {
    boarded,
  });
  return response.data;
};
