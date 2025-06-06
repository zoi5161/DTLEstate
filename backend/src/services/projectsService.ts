import Projects, { IProjects } from '../models/Projects';

class ProjectsService {
  async createProjects(fullName: string, phone: string, email: string, selectedProject: string): Promise<IProjects> {
  const newProjects = new Projects({fullName, phone, email, selectedProject});
    return await newProjects.save();
  }
}

export default new ProjectsService();
