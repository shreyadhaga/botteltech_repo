import React from 'react';

interface CarCardProps {
  brand: string;
  model: string;
  available: number;
  totalPrice: string;
  averagePrice: string;
  onBook?: () => void; // Optional callback for booking action
}

const CarCard: React.FC<CarCardProps> = ({ brand, model, available, totalPrice, averagePrice, onBook }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 w-full max-w-md bg-white">
      <h3 className="text-lg font-semibold">{brand} {model}</h3>
      <p className="text-sm text-gray-600 mb-1">Available: <span className="font-medium">{available}</span></p>
      <p className="text-sm text-gray-600 mb-1">Total Price: <span className="font-medium">${totalPrice}</span></p>
      <p className="text-sm text-gray-600">Avg Price/Day: <span className="font-medium">${averagePrice}</span></p>

      {onBook && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={onBook}
        >
          Book Now
        </button>
      )}
    </div>
  );
};

export default CarCard;
