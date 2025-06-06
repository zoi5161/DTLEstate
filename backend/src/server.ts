import express, { Express, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoutes';
import estateRoutes from './routes/estateRoutes';
import staffRoutes from './routes/staffRoutes';
import newsRoutes from './routes/newsRoutes';
import projectsRoutes from './routes/projectsRoutes';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1234;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],  // Các header cho phép
        credentials: true,  // Nếu bạn muốn sử dụng cookies, credentials cần phải bật
    })
);
app.use(express.json());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', estateRoutes);
app.use('/api', staffRoutes);
app.use('/api', newsRoutes);
app.use('/api', projectsRoutes);
app.use('/api/admin', adminRoutes);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB connected!!!`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

