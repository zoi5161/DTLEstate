// staffController.ts
import { Request, Response } from 'express';
import staffService from '../services/staffService';

class StaffController {
  // Register new staff
  async registerStaff(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, phone, email } = req.body;

      // Call service to create a new staff
      const newStaff = await staffService.createStaff(fullName, phone, email);

      res.status(201).json({ message: 'Đăng ký thành công', staff: newStaff });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error: error });
    }
  }
}

export default new StaffController();
