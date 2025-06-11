# 🚗 Bolttech Carental MVP

Welcome to the MVP for the **Bolttech Barcelona Carental Platform**, built as part of the Fullstack Technical Test. This project demonstrates the **Bookings Engine**, focusing on car availability and booking logic based on seasonal pricing.

---

## 🌍 Overview

This MVP showcases:

- ✅ Car availability lookup across date ranges
- ✅ Seasonal pricing (Peak, Mid, Off-season)
- ✅ Booking system with constraints:
  - No overlapping bookings per user
  - Driving license must be valid for the booking duration

---

## 🛠️ Tech Stack

### Frontend:
- React (Vite)
- TypeScript
- Axios
- Tailwind CSS (via CDN)

### Backend:
- Node.js + Express
- TypeScript
- MongoDB (via Mongoose)

### Testing:
- Jest (basic coverage for booking service)

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bolttech-carental.git
cd bolttech-carental
```

### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

---

## 🚀 Running the App

### Start Backend:
```bash
cd backend
npm run dev
```

> Ensure MongoDB is running locally (`mongodb://localhost:27017/bolttech-carental`)

### Start Frontend:
```bash
cd frontend
npm run dev
```

---

## 📋 API Endpoints

### `GET /api/cars/availability?fromDate=YYYY-MM-DD&toDate=YYYY-MM-DD`
Returns available cars with total and daily pricing for selected dates.

### `POST /api/bookings`
Create a booking:
```json
{
  "userId": "<user_id>",
  "carId": "<car_id>",
  "fromDate": "YYYY-MM-DD",
  "toDate": "YYYY-MM-DD"
}
```

Returns:
- `400` if driving license is expired
- `409` if booking dates overlap
- `201` on success with booking summary

---

## 📅 Seasons & Pricing Logic

| Season      | Dates                               |
|-------------|-------------------------------------|
| Peak        | 1st June – 15th Sept                |
| Mid         | 1st Mar – 31st May, 15th Sept – 31st Oct |
| Off-season  | 1st Nov – 28th Feb                  |

Prices are defined per car and vary by season.

---

## 👨‍💻 Developer Notes

- Used DDD structure for service/controller separation.
- TDD followed for booking constraints.
- MVP optimized for demo use only — no user auth or payments.

---

## 📂 Project Structure

```
bolttech-carental/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.ts
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
```

---

## ✅ Things Done

- [x] Car availability API
- [x] Booking creation
- [x] License validation
- [x] Frontend for selecting dates and booking
- [x] Basic testing
- [x] Tailwind styling via CDN

---

## 🔜 Future Improvements (if more time)

- [ ] Add user auth (JWT)
- [ ] Admin panel to manage cars/prices
- [ ] Better error UI + toast notifications
- [ ] CI pipeline and deployment (e.g., Vercel + Render)

---

## 📧 Contact

For any queries:  
**Shreya Dhaga**  
📧 [dhagashreya@gmail.com]  
---