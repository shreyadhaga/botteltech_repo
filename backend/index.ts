import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import availabilityRoutes from './routes/availabilityRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // adjust if your frontend runs elsewhere
  credentials: true,              // if you're using cookies/auth
}));


app.use('/api/availability', availabilityRoutes);
app.use('/api/bookingRoutes', bookingRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
