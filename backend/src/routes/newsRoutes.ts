// routes.ts
import { Router } from 'express';
import newsController from '../controllers/newsController';

const router = Router();

// Define the route for registering news
router.post('/register', newsController.registerNews);

export default router;
