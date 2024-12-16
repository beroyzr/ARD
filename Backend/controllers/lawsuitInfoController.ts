import { Request, Response } from "express";
import * as lawsuitInfoService from "../services/lawsuitInfoService";

export const createLawsuitInfo = async (req: Request, res: Response) => {
    try {
        const lawsuitInfo = await lawsuitInfoService.createLawsuitInfo(req.body);
        res.status(201).json(lawsuitInfo);
    } catch (error) {
        res.status(500).json({ message: "Dava bilgisi oluşturulamadı", error });
    }
};

export const getAllLawsuitInfos = async (req: Request, res: Response) => {
    try {
        const lawsuitInfos = await lawsuitInfoService.getAllLawsuitInfos();
        res.status(200).json(lawsuitInfos);
    } catch (error) {
        res.status(500).json({ message: "Dava bilgileri getirilemedi", error });
    }
};

export const getLawsuitInfoById = async (req: Request, res: Response) => {
    try {
        const lawsuitInfo = await lawsuitInfoService.getLawsuitInfoById(req.params.id);
        if (!lawsuitInfo)  res.status(404).json({ message: "Dava bilgisi bulunamadı" });
        return;
        res.status(200).json(lawsuitInfo);
    } catch (error) {
        res.status(500).json({ message: "Dava bilgisi getirilemedi", error });
    }
};

export const updateLawsuitInfo = async (req: Request, res: Response) => {
    try {
        const lawsuitInfo = await lawsuitInfoService.updateLawsuitInfo(req.params.id, req.body);
        if (!lawsuitInfo)  res.status(404).json({ message: "Dava bilgisi güncellenemedi" });
        return;
        res.status(200).json(lawsuitInfo);
    } catch (error) {
        res.status(500).json({ message: "Dava bilgisi güncellenemedi", error });
    }
};

export const deleteLawsuitInfo = async (req: Request, res: Response) => {
    try {
        const lawsuitInfo = await lawsuitInfoService.deleteLawsuitInfo(req.params.id);
        if (!lawsuitInfo)  res.status(404).json({ message: "Dava bilgisi silinemedi" });
        return;
        res.status(200).json({ message: "Dava bilgisi silindi" });
    } catch (error) {
        res.status(500).json({ message: "Dava bilgisi silinemedi", error });
    }
};
