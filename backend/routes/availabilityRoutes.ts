import express from 'express';
import { getAvailableCars } from '../controllers/availabilityController';

const router = express.Router();

router.get('/', async (req: any, res: any) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) return res.status(400).json({ error: "from and to query params are required." });

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const cars = await getAvailableCars(fromDate, toDate);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
