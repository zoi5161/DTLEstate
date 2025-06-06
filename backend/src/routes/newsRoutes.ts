import express, { Request, Response } from 'express';
import { Router } from 'express';
import newsController from '../controllers/newsController';
import News from '../models/News';

const router = Router();

// Define the route for registering news
router.post('/news', newsController.registerNews);

router.get('/news', async (req: Request, res: Response) => {
  try {
    const news = await News.find(); // Truy vấn tất cả bất động sản từ MongoDB

    if (!news || news.length === 0) {
      res.status(404).json({ message: 'No estates found' });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching estates:', error);
    res.status(500).json({ message: 'Server error while fetching estates' });
  }
});

export default router;
