import { Router } from "express";
import * as lawsuitInfoController from "../controllers/lawsuitInfoController";

const router = Router();

router.post("/", lawsuitInfoController.createLawsuitInfo);         // Yeni dava bilgisi oluştur
router.get("/", lawsuitInfoController.getAllLawsuitInfos);         // Tüm dava bilgilerini getir
router.get("/:id", lawsuitInfoController.getLawsuitInfoById);      // ID ile dava bilgisi getir
router.put("/:id", lawsuitInfoController.updateLawsuitInfo);       // Dava bilgisini güncelle
router.delete("/:id", lawsuitInfoController.deleteLawsuitInfo);    // Dava bilgisini sil

export default router;
