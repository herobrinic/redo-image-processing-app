import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resizeAndSaveImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const width = parseInt(req.body.width, 10);
    const height = parseInt(req.body.height, 10);

    if (isNaN(width) || isNaN(height)) {
      return res.status(400).json({ error: 'Invalid width or height' });
    }

    const publicUploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(publicUploadDir)) {
      fs.mkdirSync(publicUploadDir, { recursive: true });
    }

    const outputFilename = `resized-${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join(publicUploadDir, outputFilename);

    await sharp(req.file.path)
      .resize(width, height)
      .toFile(outputPath);

    return res.status(200).json({ url: `/uploads/${outputFilename}` });
  } catch (error) {
    console.error('Error processing image:', error);
    return res.status(500).json({ error: 'Image processing failed' });
  }
};
