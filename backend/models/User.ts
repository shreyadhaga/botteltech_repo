import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  drivingLicense: {
    number: { type: String, required: true, unique: true },
    validUntil: { type: Date, required: true }
  }
}, { timestamps: true });

export default model('User', userSchema);