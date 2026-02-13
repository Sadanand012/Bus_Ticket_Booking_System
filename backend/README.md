# 🚌 Bus Booking & Boarding Optimization – Backend

## 📌 Project Overview

This backend service powers the **Bus Ticket Booking System** designed for conductors and operators to manage passenger bookings and optimize boarding sequences. The system stores booking details, tracks boarding status, and calculates an **optimal boarding order** to reduce passenger boarding time.

---

## 🚀 Features

- Create and manage passenger bookings
- Seat allocation & validation
- Booking retrieval by travel date
- Boarding tracking (Boarded / Not Boarded)
- Boarding sequence optimization algorithm
- RESTful API architecture
- MongoDB database integration
- Error handling & async middleware

---

## 🧠 Boarding Optimization Logic

### Problem

Passengers boarding from seats closer to the entrance block passengers sitting farther away, increasing total boarding time.

### Solution

Passengers are boarded **from the farthest seat to the nearest seat** to avoid blocking and minimize total boarding time.

### Example

| Booking ID | Seat |
| ---------- | ---- |
| 111        | A1   |
| 222        | A7   |
| 333        | A15  |

#### ❌ Non Optimal Order

A1 → A7 → A15  
Total Time: High (Passengers block each other)

#### ✅ Optimal Order

A15 → A7 → A1  
Total Time: Minimal

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Async Handler Middleware
- REST API

---

## 📂 Project Structure

```
backend
│
├── controllers
│   └── bookingController.js
│
├── models
│   └── bookingModel.js
│
├── routes
│   └── bookingRoutes.js
│
├── utils
│   └── boardingAlgorithm.js
│
├── middleware
│   └── asyncHandler.js
│
├── config
│   └── db.js
│
├── server.js
└── package.json
```

---

## 📊 Booking Schema

```js
{
  bookingId: String,
  mobileNumber: String,
  seats: [
      type: String
  ],
  travelDate: Date,
  boarded: {
    type: Boolean,
    default: false
  }
}
```

---

## 🧮 Boarding Algorithm

### Steps

1. Extract numeric part from seat number.
2. Sort seats in descending order.
3. Maintain group passengers together.
4. Return optimized boarding sequence.

---

## 🔌 API Endpoints

### ➤ Create Booking

```
POST /api/bookings
```

---

### ➤ Get Bookings By Travel Date

```
GET /api/bookings?travelDate=YYYY-MM-DD
```

Returns optimized boarding sequence.

---

### ➤ Update Boarding Status

```
PUT /api/bookings/:id/board
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone <repo-url>
cd backend
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection
```

---

### 4️⃣ Run Server

```
npm run dev
```

---

Server runs on:

```
http://localhost:5000
```

---

## 🧪 Future Improvements

- Group booking boarding optimization
- Seat layout visualization
- Boarding time prediction analytics

---

## 👨‍💻 Author

Sadanand Mare

---

## 📜 License

This project is for learning and demonstration purposes.
