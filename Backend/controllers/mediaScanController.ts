import { Request, Response } from "express";
import MediaScan from "../models/MediaScan";
import mongoose from "mongoose";

// Validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export const getAllMediaScans = async (req: Request, res: Response) => {
    try {
        const mediaScans = await MediaScan.find(); // Tüm MediaScan kayıtlarını getir
        res.status(200).json(mediaScans);
    } catch (error) {
        res.status(500).json({ error: "Error fetching media scans" });
    }
};

export const getMediaScanById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid MediaScan ID" });
    }

    try {
        const mediaScan = await MediaScan.findById(id);
        if (!mediaScan) {
            return res.status(404).json({ error: "MediaScan not found" });
        }
        res.status(200).json(mediaScan);
    } catch (error) {
        res.status(500).json({ error: "Error fetching MediaScan" });
    }
};

export const addMediaScan = async (req: Request, res: Response) => {
    try {
        const newMediaScan = new MediaScan(req.body); // Yeni bir MediaScan kaydı oluştur
        const savedMediaScan = await newMediaScan.save();
        res.status(201).json(savedMediaScan);
    } catch (error) {
        res.status(500).json({ error: "Error creating MediaScan" });
    }
};

export const updateMediaScan = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid MediaScan ID" });
    }

    try {
        const updatedMediaScan = await MediaScan.findByIdAndUpdate(id, req.body, {
            new: true, // Güncellenmiş veriyi döndür
            runValidators: true, // Validasyon kontrolü
        });
        if (!updatedMediaScan) {
            return res.status(404).json({ error: "MediaScan not found" });
        }
        res.status(200).json(updatedMediaScan);
    } catch (error) {
        res.status(500).json({ error: "Error updating MediaScan" });
    }
};

export const deleteMediaScan = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid MediaScan ID" });
    }

    try {
        const deletedMediaScan = await MediaScan.findByIdAndDelete(id);
        if (!deletedMediaScan) {
            return res.status(404).json({ error: "MediaScan not found" });
        }
        res.status(200).json({ message: "MediaScan deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting MediaScan" });
    }
};
