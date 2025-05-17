import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const fullDir = path.resolve(__dirname, '../../full');
const thumbDir = path.resolve(__dirname, '../../thumb');

export const resizeImageHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    if (!filename) {
      res.status(400).send('Filename is required');
      return;
    }
    if (isNaN(width) || isNaN(height)) {
      res.status(400).send('Width and height must be valid numbers');
      return;
    }

    const inputPath = path.join(fullDir, `${filename}.jpg`);
    const outputPath = path.join(thumbDir, `${filename}_${width}x${height}.jpg`);

    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      res.status(404).send('Image not found');
      return;
    }

    // If already resized image exists, send it
    if (fs.existsSync(outputPath)) {
      const buffer = await sharp(outputPath).toBuffer();
      const imgSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      res.json({ imgSrc });
      return;
    }

    // Resize and save the image
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);

    // Send the resized image
    const buffer = await sharp(outputPath).toBuffer();
    const imgSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    res.json({ imgSrc });
  } catch (error) {
    console.error('Error in resizeImageHandler:', error);
    res.status(500).send('Internal Server Error');
  }
};
