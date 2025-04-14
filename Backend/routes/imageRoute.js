import express from "express"
import multer from "multer"
import cors from "cors"
import path from "path"
import fs from "fs"

const PORT = 5000;

const router = express.Router();

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageDir = join(__dirname, '../uploads/images');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
	// Accept only image files
	if (file.mimetype.startsWith('image/')) {
	  cb(null, true);  // Accept the file
	} else {
	  cb(new Error('Only image files are allowed!'), false);  // Reject the file
	}
  };

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, imageDir)
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
	  //cb(null, file.originalname)
	  const ext = path.extname(file.originalname).toLowerCase();
	  cb(null, `${uniqueSuffix}`+ext)
	}
  })

  const upload = multer({ storage: storage, fileFilter: fileFilter })

router.post('/', upload.single('file'), (req, res)=>{
	try {
		const file = req.file;
		console.log("file uploaded", file)
		if(!file){
			res.status(400).send({
				message: "Please upload a file"
			})
		}
		res.status(200).send({
			message: "File uploaded successfully"
		})
	} catch (error) {
		res.status(500).send({
			message: "Could not upload the file: " + error
		})
	}
})

export  default router