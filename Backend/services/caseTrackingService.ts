import { Request, Response } from "express";
import CaseTrackingModel from "../models/CaseTracking"; // Örnek model yolu, düzenleyin.

export const getAllCases = async (req: Request, res: Response) => {
    try {
        const cases = await CaseTrackingModel.find();
        res.status(200).json({ success: true, data: cases });
    } catch (error) {
        console.error("Error fetching cases:", error);
        res.status(500).json({ success: false, message: "Failed to fetch cases." });
    }
};

export const getCaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const caseData = await CaseTrackingModel.findById(id);
        if (!caseData) {
            return res.status(404).json({ success: false, message: "Case not found." });
        }
        res.status(200).json({ success: true, data: caseData });
    } catch (error) {
        console.error("Error fetching case by ID:", error);
        res.status(500).json({ success: false, message: "Failed to fetch case." });
    }
};

export const addCase = async (req: Request, res: Response) => {
    try {
        const newCase = new CaseTrackingModel(req.body);
        const savedCase = await newCase.save();
        res.status(201).json({ success: true, data: savedCase });
    } catch (error) {
        console.error("Error adding case:", error);
        res.status(500).json({ success: false, message: "Failed to add case." });
    }
};

export const updateCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCase = await CaseTrackingModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCase) {
            return res.status(404).json({ success: false, message: "Case not found." });
        }
        res.status(200).json({ success: true, data: updatedCase });
    } catch (error) {
        console.error("Error updating case:", error);
        res.status(500).json({ success: false, message: "Failed to update case." });
    }
};

export const deleteCase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCase = await CaseTrackingModel.findByIdAndDelete(id);
        if (!deletedCase) {
            return res.status(404).json({ success: false, message: "Case not found." });
        }
        res.status(200).json({ success: true, message: "Case deleted successfully." });
    } catch (error) {
        console.error("Error deleting case:", error);
        res.status(500).json({ success: false, message: "Failed to delete case." });
    }
};
