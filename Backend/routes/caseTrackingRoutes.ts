import express, { Request, Response, NextFunction, Router } from "express";
import CaseTracking, { ICaseTracking } from "../models/CaseTracking";
import mongoose from "mongoose";


import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Add after your existing imports and before the router declaration
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ storage });


const router: Router = express.Router();

// Validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Middleware to handle async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Upload file to a case
router.post(
    "/:id/upload",
    upload.single("file"),
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid case ID" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const caseRecord = await CaseTracking.findById(id);
        if (!caseRecord) {
            return res.status(404).json({ error: "Case not found" });
        }

        // Add file path to case attachments
        if (!caseRecord.attachments) {
            caseRecord.attachments = [];
        }
        caseRecord.attachments.push(req.file.path);
        await caseRecord.save();

        res.json({
            message: "File uploaded successfully",
            file: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path
            },
            case: caseRecord
        });
    })
);

// Get case attachments
router.get(
    "/:id/attachments",
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid case ID" });
        }

        const caseRecord = await CaseTracking.findById(id);
        if (!caseRecord) {
            return res.status(404).json({ error: "Case not found" });
        }

        res.json({
            attachments: caseRecord.attachments || []
        });
    })
);

// Get all cases
router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const cases = await CaseTracking.find();
        res.json(cases);
    })
);

// Get a specific case by ID
router.get(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid case ID" });
        }
        const caseRecord = await CaseTracking.findById(id);
        if (!caseRecord) {
            return res.status(404).json({ error: "Case not found" });
        }
        res.json(caseRecord);
    })
);

// Add a new case
router.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const newCase: ICaseTracking = new CaseTracking(req.body);
        const savedCase = await newCase.save();
        res.status(201).json(savedCase);
    })
);

// Update a case by ID
router.put(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid case ID" });
        }
        const updatedCase = await CaseTracking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCase) {
            return res.status(404).json({ error: "Case not found" });
        }
        res.json(updatedCase);
    })
);

// Delete a case by ID
router.delete(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid case ID" });
        }
        const deletedCase = await CaseTracking.findByIdAndDelete(id);
        if (!deletedCase) {
            return res.status(404).json({ error: "Case not found" });
        }
        res.json({ message: "Case deleted successfully" });
    })
);

// Centralized error handling middleware
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default router;