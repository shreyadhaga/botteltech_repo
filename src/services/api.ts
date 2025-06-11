import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface AvailabilityQuery {
  from: string; // ISO string: '2025-06-11'
  to: string;
}

export interface CarAvailability {
  _id: string;
  brand: string;
  model: string;
  available: number;
  averagePrice: string;
  totalPrice: string;
}

export interface BookingRequest {
  userId: string;
  carId: string;
  fromDate: string;
  toDate: string;
}

export interface BookingResponse {
  booking: {
    _id: string;
    user: string;
    car: string;
    fromDate: string;
    toDate: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
}

// API functions

export const fetchAvailableCars = async (params: AvailabilityQuery): Promise<CarAvailability[]> => {
  const response = await api.get('/availability', { params });
  return response.data;
};

export const createBooking = async (data: BookingRequest): Promise<BookingResponse> => {
  const response = await api.post('/booking', data);
  return response.data;
};

export default api;