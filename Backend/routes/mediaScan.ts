import express, { Request, Response } from "express";
import MediaScan from '../models/MediaScan';
import multer from "multer";

const router = express.Router();

// Tüm medya tarama verilerini getir
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await MediaScan.find();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni medya tarama kaydı ekle
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecord = new MediaScan(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
