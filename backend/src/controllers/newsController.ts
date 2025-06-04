// newsController.ts
import { Request, Response } from 'express';
import newsService from '../services/newsService';

class NewsController {
  // Register new News
  async registerNews(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, phone, email } = req.body;

      // Call service to create a new News
      const newNews = await newsService.createNews(fullName, phone, email);

      res.status(201).json({ message: 'Đăng ký thành công', news: newNews });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error: error });
    }
  }
}

export default new NewsController();
