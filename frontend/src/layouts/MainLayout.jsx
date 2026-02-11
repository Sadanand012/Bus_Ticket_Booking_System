import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Booking</Link> | <Link to="/bookings">Booking List</Link>
      </nav>

      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
};

export default MainLayout;
