import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import * as userService from "../services/userService";

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcı oluşturulurken hata oluştu.", error });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcılar listelenirken hata oluştu.", error });
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const user = await userService.findUserById(req.params.id);
            if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Kullanıcı bilgisi alınırken hata oluştu.", error });
        }
    }

    // Login Fonksiyonu
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Kullanıcıyı email ile bul
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "E-posta veya şifre hatalı." });
            }

            // Şifre doğrulama
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "E-posta veya şifre hatalı." });
            }

            // JWT Token oluşturma
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
                expiresIn: "1h", // Token 1 saat geçerli
            });

            res.status(200).json({ message: "Giriş başarılı.", token });
        } catch (error) {
            res.status(500).json({ message: "Giriş sırasında bir hata oluştu.", error });
        }
    }
}
