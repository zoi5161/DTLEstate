import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Estate from '../models/Estate';
import { createEstateController } from '../controllers/estateController';

const router = express.Router();

// Cấu hình multer lưu ảnh vào folder backend/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    // Đặt tên file theo timestamp + tên gốc để tránh trùng
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Upload ảnh: trường "images" nhiều ảnh, "imageAddress" 1 ảnh
const cpUpload = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'imageAddress', maxCount: 1 },
]);

router.post('/estates', cpUpload, createEstateController);
router.get('/estates', async (req: Request, res: Response) => {
  try {
    const estates = await Estate.find(); // Truy vấn tất cả bất động sản từ MongoDB

    if (!estates || estates.length === 0) {
      res.status(404).json({ message: 'No estates found' });
    }

    res.status(200).json(estates); // Trả về danh sách bất động sản
  } catch (error) {
    console.error('Error fetching estates:', error);
    res.status(500).json({ message: 'Server error while fetching estates' });
  }
});

router.put('/estates/:id', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'imageAddress', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
      return;
    }

    // Xóa ảnh cũ nếu có
    if (estate.images && estate.images.length > 0) {
      // Xóa ảnh cũ trong thư mục uploads
      estate.images.forEach((imagePath) => {
        const oldImagePath = path.join(__dirname, '../../', imagePath); // Đảm bảo đường dẫn đúng chỉ có 1 "uploads"
        try {
          fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
        } catch (error) {
          console.error(`Error deleting old image: ${oldImagePath}`, error);
        }
      });
    }

    if (estate.imageAddress) {
      const oldImageAddressPath = path.join(__dirname, '../../', estate.imageAddress); // Đảm bảo đường dẫn đúng chỉ có 1 "uploads"
      try {
        fs.unlinkSync(oldImageAddressPath); // Xóa ảnh address cũ
      } catch (error) {
        console.error(`Error deleting old image address: ${oldImageAddressPath}`, error);
      }
    }

    // Cập nhật các trường của estate
    estate.name = req.body.name || estate.name;
    estate.address = req.body.address || estate.address;
    estate.slogan = req.body.slogan || estate.slogan;
    estate.price = req.body.price || estate.price;
    estate.area = req.body.area || estate.area;
    estate.startSell = req.body.startSell || estate.startSell;
    estate.description = req.body.description || estate.description;
    estate.status = req.body.status || estate.status;
    estate.buyerAgentFee = req.body.buyerAgentFee || estate.buyerAgentFee;
    estate.lifestyles = req.body.lifestyles || estate.lifestyles;
    estate.viewDescription = req.body.viewDescription || estate.viewDescription;
    estate.utilities = req.body.utilities || estate.utilities;

    // Cập nhật ảnh nếu có
    if (req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['images']) {
      estate.images = ((req.files as { [fieldname: string]: Express.Multer.File[] })['images']).map((file) => 'uploads/' + file.filename);
    }
    if (req.files && (req.files as { [fieldname: string]: Express.Multer.File[] })['imageAddress']) {
      estate.imageAddress = 'uploads/' + ((req.files as { [fieldname: string]: Express.Multer.File[] })['imageAddress'][0] as Express.Multer.File).filename;
    }

    // Lưu thay đổi
    const updatedEstate = await estate.save();

    res.status(200).json(updatedEstate);
  } catch (error) {
    console.error('Error updating estate:', error);
    res.status(500).json({ message: 'Error updating estate' });
  }
});

router.delete('/estates/:id', async (req: Request, res: Response) => {
  try {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
      return;
    }

    // Xóa ảnh cũ nếu có
    if (estate.images && estate.images.length > 0) {
      estate.images.forEach((imagePath) => {
        const oldImagePath = path.join(__dirname, '../../', imagePath); // Đảm bảo đường dẫn đúng chỉ có 1 "uploads"
        try {
          fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
        } catch (error) {
          console.error(`Error deleting old image: ${oldImagePath}`, error);
        }
      });
    }

    if (estate.imageAddress) {
      const oldImageAddressPath = path.join(__dirname, '../../', estate.imageAddress); // Đảm bảo đường dẫn đúng chỉ có 1 "uploads"
      try {
        fs.unlinkSync(oldImageAddressPath); // Xóa ảnh address cũ
      } catch (error) {
        console.error(`Error deleting old image address: ${oldImageAddressPath}`, error);
      }
    }

    // Xóa estate khỏi database
    await Estate.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'Estate deleted successfully' });
  } catch (error) {
    console.error('Error deleting estate:', error);
    res.status(500).json({ message: 'Error deleting estate' });
  }
});


export default router;