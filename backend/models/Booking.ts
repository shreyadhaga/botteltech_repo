// backend/models/Booking.ts
import { Schema, model, Types } from 'mongoose';

const bookingSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  car: { type: Types.ObjectId, ref: 'Car', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

bookingSchema.index({ user: 1, fromDate: 1, toDate: 1 }, { unique: true });

export default model('Booking', bookingSchema);
