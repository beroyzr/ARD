import { Request, Response } from "express";
import * as applicationService from "../services/applicationService";

// Başvuru oluşturma
export const createApplication = async (req: Request, res: Response) => {
    try {
        const application = await applicationService.createApplication(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Başvuru oluşturulamadı", error });
    }
};

// Tüm başvuruları listeleme
export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applications = await applicationService.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Başvurular getirilemedi", error });
    }
};

// Belirli bir başvuruyu ID ile getirme
export const getApplicationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID'yi req.params'dan alıyoruz
        const application = await applicationService.getApplicationById(id);
        if (!application)  res.status(404).json({ message: "Başvuru bulunamadı" });
        return;
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: "Başvuru getirilemedi", error });
    }
};

// Belirli bir başvuruyu ID ile güncelleme
export const updateApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID'yi req.params'dan alıyoruz
        const application = await applicationService.updateApplication(id, req.body);
        if (!application)  res.status(404).json({ message: "Başvuru güncellenemedi" });
        return;
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: "Başvuru güncellenemedi", error });
    }
};

// Belirli bir başvuruyu ID ile silme
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // ID'yi req.params'dan alıyoruz
        const application = await applicationService.deleteApplication(id);
        if (!application)  res.status(404).json({ message: "Başvuru silinemedi" });
        return;
        res.status(200).json({ message: "Başvuru silindi" });
    } catch (error) {
        res.status(500).json({ message: "Başvuru silinemedi", error });
    }
};
