import React, { useEffect, useState } from "react";
import { createBooking, fetchAvailableCars } from "../services/api";
import DateRangePicker from "../component/DateRangePicker";
import CarCard from "../component/CarCard";

interface CarAvailability {
    _id: string;
  brand: string;
  model: string;
  available: number;
  totalPrice: string;
  averagePrice: string;
}

const Booking: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [cars, setCars] = useState<CarAvailability[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarAvailability | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const TAX_RATE = 0.21;

  const handleAvailability = async () => {
    try {
      const { from, to } = dateRange;
      if (!from || !to) return;

      const data = await fetchAvailableCars({ from, to });
      setCars(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      handleAvailability();
    }
  }, [dateRange]);

  const handleBook = async () => {
    if (!selectedCar || !dateRange.from || !dateRange.to) return;

    try {
      setLoading(true);
      const res = await createBooking({
        userId: "6643f9a1aa1ec72c88569911", // TODO: Replace with real user
        carId: selectedCar._id,
        fromDate: dateRange.from,
        toDate: dateRange.to,
      });

      setMessage(`✅ Booking confirmed! Booking ID: ${res.booking._id}`);
      setSelectedCar(null);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "❌ Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  const calculateWithTax = (price: string) => {
    const num = parseFloat(price);
    const tax = num * TAX_RATE;
    return (num + tax).toFixed(2);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Your Car</h2>

      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {selectedCar ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Selected Car:</h3>
          <CarCard
            brand={selectedCar.brand}
            model={selectedCar.model}
            available={selectedCar.available}
            totalPrice={selectedCar.totalPrice}
            averagePrice={selectedCar.averagePrice}
          />
          <div className="mt-4 text-sm text-gray-700">
            <p>Base Price: ${selectedCar.totalPrice}</p>
            <p>
              Tax (21%): $
              {(parseFloat(selectedCar.totalPrice) * TAX_RATE).toFixed(2)}
            </p>
            <p className="font-medium">
              Total with Tax: ${calculateWithTax(selectedCar.totalPrice)}
            </p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleBook}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              brand={car.brand}
              model={car.model}
              available={car.available}
              totalPrice={car.totalPrice}
              averagePrice={car.averagePrice}
              onBook={() => setSelectedCar(car)}
            />
          ))}
        </div>
      )}

      {message && <p className="mt-6 text-blue-600 font-medium">{message}</p>}
    </div>
  );
};

export default Booking;
