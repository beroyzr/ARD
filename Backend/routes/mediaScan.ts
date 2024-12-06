import express, { Request, Response, NextFunction } from "express";
import MediaScan from "../models/MediaScan";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";

// Extend Request type to include Multer's `file` property
interface MulterRequest extends Request {
  file?: Express.MulterS3.File | Express.Multer.File;
}

const router = express.Router();

// Ensure the /uploads directory exists for local storage fallback
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure AWS S3 Client
const isS3Configured =
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_REGION &&
  process.env.AWS_S3_BUCKET_NAME;

const s3 = isS3Configured
  ? new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION,
  })
  : null;

// Configure Multer storage (S3 or local fallback)
const storage = s3
  ? multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  })
  : multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  });

const upload = multer({ storage });

// Get all media scans
router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await MediaScan.find();
    res.json(data);
  } catch (err: any) {
    next(err);
  }
});

// Add a new media scan record
router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newRecord = new MediaScan(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err: any) {
    next(err);
  }
});

// Upload media file
router.post(
  "/upload",
  upload.single("file"),
  async (req: MulterRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded." });
        return; // Exit the function after sending the response
      }
      res.status(200).json({
        message: "File uploaded successfully.",
        file: req.file,
      });
    } catch (err: any) {
      next(err); // Forward the error to the error-handling middleware
    }
  }
);


// Centralized error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default router;
