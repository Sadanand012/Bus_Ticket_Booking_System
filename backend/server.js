const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bus Ticket Booking Backend Running");
});
connectDB();

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
