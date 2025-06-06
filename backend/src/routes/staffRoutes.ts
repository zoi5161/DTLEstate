import express, { Request, Response } from 'express';
import { Router } from 'express';
import staffController from '../controllers/staffController';
import Staffs from '../models/Staff';

const router = Router();

// Define the route for registering staff
router.post('/register', staffController.registerStaff);

router.get('/staffs', async (req: Request, res: Response) => {
  try {
    const staffs = await Staffs.find(); // Truy vấn tất cả bất động sản từ MongoDB

    if (!staffs || staffs.length === 0) {
      res.status(404).json({ message: 'No estates found' });
    }

    res.status(200).json(staffs);
  } catch (error) {
    console.error('Error fetching estates:', error);
    res.status(500).json({ message: 'Server error while fetching estates' });
  }
});


export default router;
