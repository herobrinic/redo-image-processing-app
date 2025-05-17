import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../services/imageService';

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Helper to wrap async route handlers and pass errors to next()
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);

    if (isNaN(width) || isNaN(height)) {
      res.status(400).json({ error: 'Invalid width or height' });
      return;
    }

    const resizedImagePath = await resizeImage(req.file.path, width, height);

    res.status(200).json({
      resizedImagePath: `/uploads/${path.basename(resizedImagePath)}`,
    });
  })
);

export default router;
