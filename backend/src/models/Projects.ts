import mongoose, { Schema, Document } from 'mongoose';

export interface IProjects extends Document {
  fullName: string;
  phone: string;
  email: string;
  selectedProject: string;
}

const ProjectsSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    selectedProject: { type: String, required: true },
  },
  { timestamps: true }
);

const Projects = mongoose.model<IProjects>('Projects', ProjectsSchema);

export default Projects;
