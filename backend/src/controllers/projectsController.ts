import { Request, Response } from 'express';
import projectsService from '../services/projectsService';

class ProjectsController {
  // Register new Projects
  async registerProjects(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, phone, email, selectedProject } = req.body;

      const newProjects = await projectsService.createProjects(fullName, phone, email, selectedProject);

      res.status(201).json({ message: 'Đăng ký thành công', projects: newProjects });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error: error });
    }
  }
}

export default new ProjectsController();
