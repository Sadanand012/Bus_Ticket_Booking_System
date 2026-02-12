import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", margin: 0 }}>
      <nav style={{ padding: "10px 20px", background: "#eee" }}>
        <Link to="/">Booking</Link> | <Link to="/bookings">Booking List</Link>
      </nav>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          paddingTop: "40px",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
