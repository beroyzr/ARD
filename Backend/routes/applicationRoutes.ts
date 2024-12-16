import { Router } from "express";
import {createApplication,getAllApplications,getApplicationById,updateApplication,deleteApplication} from "../controllers/applicationController";

const router = Router();

router.post('/createApplication', createApplication);        // Başvuru oluştur
router.get("/getAllApplications", getAllApplications);        // Tüm başvuruları getir
router.get("/getApplicationById/:id" , getApplicationById);     // ID ile başvuru getir
router.put("/updateApplication/:id" , updateApplication);      // Başvuru güncelle
router.delete("/deleteApplication/:id" ,deleteApplication);   // Başvuru sil

export default router;
