import { Router } from "express";
import userController from "../controllers/userController"; // Default export edilen sınıfı import ediyoruz

const router = Router();

router.post("/", userController.createUser);         // Kullanıcı oluştur
router.get("/", userController.getAllUsers);         // Tüm kullanıcıları listele
router.get("/:id", userController.getUserById);      // Tek bir kullanıcıyı getir

export default router;
