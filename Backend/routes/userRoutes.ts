import { Router, Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    await UserController.createUser(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await UserController.getAllUsers(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await UserController.getUserById(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
    await UserController.login(req, res);
});

export default router;
