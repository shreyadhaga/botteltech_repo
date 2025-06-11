import express from 'express';
import { createBooking } from '../controllers/bookingController';

const router = express.Router();

router.post('/', async (req:any, res:any) => {
  try {
    const { userId, carId, fromDate, toDate } = req.body;
    if (!userId || !carId || !fromDate || !toDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await createBooking({
      userId,
      carId,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate)
    });

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    return res.status(201).json({ booking: result.booking });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;