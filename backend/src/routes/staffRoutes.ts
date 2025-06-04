// routes.ts
import { Router } from 'express';
import staffController from '../controllers/staffController';

const router = Router();

// Define the route for registering staff
router.post('/register', staffController.registerStaff);

export default router;
