import express, { Express, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 1234;

app.use(
    cors({
        origin: process.env.CLIENT_URL,  // Cho phép từ địa chỉ này
        methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Các phương thức HTTP cho phép
        allowedHeaders: ['Content-Type', 'Authorization'],  // Các header cho phép
        credentials: true,  // Nếu bạn muốn sử dụng cookies, credentials cần phải bật
    })
);

app.use(bodyParser.json());

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

