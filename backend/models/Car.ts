// backend/models/Car.ts
import { Schema, model } from 'mongoose';

const carSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  stock: { type: Number, required: true },
  pricing: {
    peak: { type: Number, required: true },
    mid: { type: Number, required: true },
    off: { type: Number, required: true },
    type: Map,
    of: Number,
    required: true
  }
}, { timestamps: true });

export default model('Car', carSchema);
