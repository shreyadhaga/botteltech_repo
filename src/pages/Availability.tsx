import React, { useState } from 'react';
import DateRangePicker from '../component/DateRangePicker';
import CarCard from '../component/CarCard';
import { fetchAvailableCars } from '../services/api';

interface CarAvailability {
  brand: string;
  model: string;
  available: number;
  totalPrice: string;
  averagePrice: string;
}

const Availability: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<CarAvailability[]>([]);
  const [error, setError] = useState('');

  const handleCheckAvailability = async () => {
    setError('');
    setLoading(true);
    try {
      const { from, to } = dateRange;

      if (!from || !to) {
        setError('Please select both start and end dates.');
        setLoading(false);
        return;
      }

      const data = await fetchAvailableCars({ from, to });
      setCars(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check Car Availability</h1>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleCheckAvailability}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Availability'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {cars.map((car, index) => (
          <CarCard
            key={index}
            brand={car.brand}
            model={car.model}
            available={car.available}
            totalPrice={car.totalPrice}
            averagePrice={car.averagePrice}
          />
        ))}
      </div>

      {!loading && cars.length === 0 && (
        <p className="mt-6 text-gray-500">No cars found for selected dates.</p>
      )}
    </div>
  );
};

export default Availability;
