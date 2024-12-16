import { Request, Response } from "express";
import CaseTracking from "../models/CaseTracking";
import mongoose from "mongoose";

// Validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export const uploadFileToCase = async (req: Request, res: Response) => {
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
            path: req.file.path,
        },
        case: caseRecord,
    });
};

export const getCaseAttachments = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid case ID" });
    }

    const caseRecord = await CaseTracking.findById(id);
    if (!caseRecord) {
        return res.status(404).json({ error: "Case not found" });
    }

    res.json({
        attachments: caseRecord.attachments || [],
    });
};

export const getAllCases = async (req: Request, res: Response) => {
    const cases = await CaseTracking.find();
    res.json(cases);
};

export const getCaseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid case ID" });
    }

    const caseRecord = await CaseTracking.findById(id);
    if (!caseRecord) {
        return res.status(404).json({ error: "Case not found" });
    }
    res.json(caseRecord);
};

export const addNewCase = async (req: Request, res: Response) => {
    const newCase = new CaseTracking(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
};

export const updateCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid case ID" });
    }
    const updatedCase = await CaseTracking.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedCase) {
        return res.status(404).json({ error: "Case not found" });
    }
    res.json(updatedCase);
};

export const deleteCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid case ID" });
    }
    const deletedCase = await CaseTracking.findByIdAndDelete(id);
    if (!deletedCase) {
        return res.status(404).json({ error: "Case not found" });
    }
    res.json({ message: "Case deleted successfully" });
};
