// @ts-nocheck
import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { requireAuth } from '../../middleware/auth.middleware';

import fs from 'fs';

const validModules = ['stories', 'services', 'portfolio'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const moduleName = req.query.module as string;
    let dest = 'uploads/';
    if (moduleName && validModules.includes(moduleName)) {
      dest = `uploads/${moduleName}/`;
    }
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

const router = Router();
router.use(requireAuth);

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'No image provided' } });
    }
    
    const moduleName = req.query.module as string;
    let subfolder = '';
    if (moduleName && validModules.includes(moduleName)) {
      subfolder = `${moduleName}/`;
    }

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const url = `${protocol}://${host}/uploads/${subfolder}${req.file.filename}`;
    res.json({ success: true, data: { url } });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to upload image' } });
  }
});

export default router;
