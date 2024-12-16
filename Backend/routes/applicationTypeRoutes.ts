import { Router } from "express";
import * as applicationTypeController from "../controllers/applicationTypeController";

const router = Router();

router.post("/", applicationTypeController.createApplicationType);        // Başvuru türü oluştur
router.get("/", applicationTypeController.getAllApplicationTypes);        // Tüm başvuru türlerini getir
router.get("/:id", applicationTypeController.getApplicationTypeById);     // ID ile başvuru türü getir
router.put("/:id", applicationTypeController.updateApplicationType);      // Başvuru türü güncelle
router.delete("/:id", applicationTypeController.deleteApplicationType);   // Başvuru türü sil

export default router;
