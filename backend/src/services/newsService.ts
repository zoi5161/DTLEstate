import News, { INews } from '../models/News';

class NewsService {
  async createNews(fullName: string, phone: string, email: string): Promise<INews> {
    const newNews = new News({ fullName, phone, email });
    return await newNews.save();
  }
}

export default new NewsService();
