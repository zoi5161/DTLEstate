import express, { Request, Response } from 'express';
import { Router } from 'express';
import projectsController from '../controllers/projectsController';
import Projects from '../models/Projects';

const router = Router();

router.post('/projects', projectsController.registerProjects);

router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find();

    if (!projects || projects.length === 0) {
      res.status(404).json({ message: 'No estates found' });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching estates:', error);
    res.status(500).json({ message: 'Server error while fetching estates' });
  }
});

export default router;
