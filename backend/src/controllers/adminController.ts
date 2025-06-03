import { Request, Response } from 'express';
import * as adminService from '../services/adminService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existAdmin = await adminService.findAdminByUsername(username);
    if (existAdmin) {
      res.status(400).json({ message: 'Username đã tồn tại' });
      return;
    }
    const admin = await adminService.createAdmin(username, password);
    res.status(201).json({ message: 'Đăng ký thành công', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const admin = await adminService.findAdminByUsername(username);
    if (!admin) {
      res.status(401).json({ message: 'Sai username hoặc password' });
      return;
    }
    const isMatch = await adminService.comparePassword(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Sai username hoặc password' });
      return;
    }
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '10m' }
    );
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
