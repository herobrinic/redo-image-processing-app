import express, { Request, Response } from 'express';

import multer from 'multer';

import path from 'path';

import fs from 'fs';

const router = express.Router();




// Configure Multer storage

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, '../../uploads'));

  },

  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);

  },

});




const upload = multer({ storage });




// POST /upload route

router.post('/upload', upload.single('image'), (req: Request, res: Response): void => {

  if (!req.file) {

    res.status(400).json({ error: 'No file uploaded.' });

    return;

  }

  res.status(200).json({ filename: req.file.filename });

});






router.get('/gallery', (_req, res) => {

  const uploadsDir = path.join(__dirname, '../../uploads');

  fs.readdir(uploadsDir, (err, files) => {

    if (err) return res.status(500).json({ error: 'Failed to read gallery' });




    const images = files

      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))

      .map((file) => `/uploads/${file}`);




    res.json(images);

  });

});




export default router;