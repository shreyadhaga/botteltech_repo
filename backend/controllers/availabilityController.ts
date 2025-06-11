import Car from '../models/Car';
import Booking from '../models/Booking';

function getSeason(date: Date): 'peak' | 'mid' | 'off' {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month >= 6 && month <= 9 && !(month === 9 && day > 15)) return 'peak';
  if ((month === 3 && day >= 1) || (month > 3 && month < 6)) return 'mid';
  if (month === 9 && day >= 15 && day <= 30) return 'mid';
  if (month === 10) return 'mid';
  return 'off';
}

export async function getAvailableCars(fromDate: Date, toDate: Date) {
  const season = getSeason(fromDate);
  const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));

  const bookings = await Booking.find({
    $or: [
      { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }
    ]
  }).lean();

  const carBookings: { [carId: string]: number } = {};
  bookings.forEach(b => {
    const id = b.car.toString();
    carBookings[id] = (carBookings[id] || 0) + 1;
  });

  const cars = await Car.find().lean();
  return cars
    .filter(car => (car.stock - (carBookings[car._id.toString()] || 0)) > 0)
    .map(car => {
      const daily = car.pricing[season];
      return {
        brand: car.brand,
        model: car.model,
        available: car.stock - (carBookings[car._id.toString()] || 0),
        averagePrice: daily.toFixed(2),
        totalPrice: (daily * days).toFixed(2)
      };
    });
}
