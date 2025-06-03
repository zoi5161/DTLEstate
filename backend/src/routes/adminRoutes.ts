import express from 'express';
import * as adminController from '../controllers/adminController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Ví dụ route bảo vệ Manage, backend chỉ dùng để kiểm tra
router.get('/manage', verifyToken, (req, res) => {
  res.json({ message: 'Bạn đã truy cập Manage thành công' });
});

export default router;