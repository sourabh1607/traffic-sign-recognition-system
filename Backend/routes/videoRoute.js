
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Make sure 'uploads/videos' directory exists
//const videoDir = path.join(__dirname, '../uploads/videos');

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const videoDir = join(__dirname, '../uploads/videos');

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videoDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
	const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueName}`+ext);
  }
});

// Multer filter to only accept videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/mkv', 'video/webm'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only videos are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route to handle video upload
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid type' });
  }
  res.status(200).json({ message: 'Video uploaded successfully', file: req.file.filename });
});

export default router;
