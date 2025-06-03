import { Request, Response } from 'express';
import { createEstate } from '../services/estateService';
import Estate from '../models/Estate';
import path from 'path';
import fs from 'fs';

export const createEstateController = async (req: Request, res: Response): Promise<void> => {
  try {
    /*
      req.body sẽ chứa các trường text khác (name, price, ...)
      req.files sẽ chứa các file ảnh upload theo multer
      Trong client gửi lên ta dùng 'images' cho nhiều ảnh, 'imageAddress' cho 1 ảnh
    */

    // Lấy các trường text
    const {
      name,
      address,
      slogan,
      price,
      area,
      startSell,
      description,
      status,
      buyerAgentFee,
      lifestyles,
      viewDescription,
      utilities,
    } = req.body;

    // Kiểm tra bắt buộc
    if (!name || !address || !price || !area || !startSell || !description) {
      return;
    }

    // Xử lý file ảnh
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const filesImages = files?.images ?? [];
    const filesImageAddress = files?.imageAddress ?? [];


    // Lấy đường dẫn tương đối (relative) lưu vào DB, ví dụ: "uploads/filename.jpg"
    const imagesPaths = filesImages.map((f) => path.join('uploads', f.filename));
    const imageAddressPath = filesImageAddress.length > 0 ? path.join('uploads', filesImageAddress[0].filename) : '';

    // Tạo estate
    const estateData = {
      name,
      address,
      slogan,
      price: Number(price),
      area: Number(area),
      startSell: new Date(startSell),
      description,
      status,
      buyerAgentFee: buyerAgentFee ? Number(buyerAgentFee) : undefined,
      lifestyles,
      viewDescription,
      utilities,
      images: imagesPaths,
      imageAddress: imageAddressPath,
    };

    const newEstate = await createEstate(estateData);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};