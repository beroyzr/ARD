import { Request, Response } from "express";
import * as userService from "../services/userService";

class UserController {
    // Kullanıcı oluşturma
    async createUser(req: Request, res: Response) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcı oluşturulurken hata oluştu.", error });
        }
    }

    // Tüm kullanıcıları listeleme
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcılar listelenirken hata oluştu.", error });
        }
    }

    // Tek bir kullanıcıyı getirme
    async getUserById(req: Request, res: Response) {
        try {
            const user = await userService.findUserById(req.params.id);
            if (!user)  res.status(404).json({ message: "Kullanıcı bulunamadı." });
            return;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcı bilgisi alınırken hata oluştu.", error });
        }
    }
}

export default new UserController();
