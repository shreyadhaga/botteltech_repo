import Booking from '../models/Booking';
import User from '../models/User';
import Car from '../models/Car';

function getSeason(date: Date): 'peak' | 'mid' | 'off' {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month >= 6 && month <= 9 && !(month === 9 && day > 15)) return 'peak';
  if ((month === 3 && day >= 1) || (month > 3 && month < 6)) return 'mid';
  if (month === 9 && day >= 15 && day <= 30) return 'mid';
  if (month === 10) return 'mid';
  return 'off';
}

export async function createBooking({
  userId,
  carId,
  fromDate,
  toDate
}: {
  userId: string;
  carId: string;
  fromDate: Date;
  toDate: Date;
}) {
  const user = await User.findById(userId);
  if (!user) return { success: false, message: "User not found." };
  if (!user?.drivingLicense || user.drivingLicense.validUntil < toDate)
    return { success: false, message: "Driving license must be valid for the entire booking period." };

  const existingBooking = await Booking.findOne({
    user: userId,
    $or: [
      { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }
    ]
  });

  if (existingBooking)
    return { success: false, message: "User already has a booking during the selected dates." };

  const car = await Car.findById(carId);
  if (!car) return { success: false, message: "Car not found." };

  const season = getSeason(fromDate);
  const dailyPrice = car?.pricing.get(season);
  if (!dailyPrice) return { success: false, message: "Invalid pricing configuration for season." };

  const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = dailyPrice * days;

  const overlappingBookings = await Booking.countDocuments({
    car: carId,
    $or: [
      { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }
    ]
  });

  if (overlappingBookings >= car.stock)
    return { success: false, message: "No available cars for the selected model and date range." };

  const booking = await Booking.create({
    user: userId,
    car: carId,
    fromDate,
    toDate,
    totalPrice
  });

  return { success: true, booking };
}
