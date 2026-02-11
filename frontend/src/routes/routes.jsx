import { Routes, Route } from "react-router-dom";
import BookingPage from "../pages/BookingPage";
import BookingListPage from "../pages/BookingListPage";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/bookings" element={<BookingListPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
