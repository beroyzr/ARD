import { Request, Response } from "express";
import * as applicationTypeService from "../services/applicationTypeService";

export const createApplicationType = async (req: Request, res: Response) => {
    try {
        const applicationType = await applicationTypeService.createApplicationType(req.body);
        res.status(201).json(applicationType);
    } catch (error) {
        res.status(500).json({ message: "Başvuru türü oluşturulamadı", error });
    }
};

export const getAllApplicationTypes = async (req: Request, res: Response) => {
    try {
        const applicationTypes = await applicationTypeService.getAllApplicationTypes();
        res.status(200).json(applicationTypes);
    } catch (error) {
        res.status(500).json({ message: "Başvuru türleri getirilemedi", error });
    }
};

export const getApplicationTypeById = async (req: Request, res: Response) => {
    try {
        const applicationType = await applicationTypeService.getApplicationTypeById(req.params.id);
        if (!applicationType)  res.status(404).json({ message: "Başvuru türü bulunamadı" });
        return;
        res.status(200).json(applicationType);
    } catch (error) {
        res.status(500).json({ message: "Başvuru türü getirilemedi", error });
    }
};

export const updateApplicationType = async (req: Request, res: Response) => {
    try {
        const applicationType = await applicationTypeService.updateApplicationType(req.params.id, req.body);
        if (!applicationType)  res.status(404).json({ message: "Başvuru türü güncellenemedi" });
        return;
        res.status(200).json(applicationType);
    } catch (error) {
        res.status(500).json({ message: "Başvuru türü güncellenemedi", error });
    }
};

export const deleteApplicationType = async (req: Request, res: Response) => {
    try {
        const applicationType = await applicationTypeService.deleteApplicationType(req.params.id);
        if (!applicationType)  res.status(404).json({ message: "Başvuru türü silinemedi" });
        return;
        res.status(200).json({ message: "Başvuru türü silindi" });
    } catch (error) {
        res.status(500).json({ message: "Başvuru türü silinemedi", error });
    }
};
