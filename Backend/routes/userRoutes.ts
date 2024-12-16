import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.post("/", UserController.createUser);         // Kullanıcı oluştur
router.get("/", UserController.getAllUsers);         // Tüm kullanıcıları listele
router.get("/:id", UserController.getUserById);      // Tek bir kullanıcıyı getir
router.post("/login", UserController.login);         // Kullanıcı girişi (login)

export default router;
