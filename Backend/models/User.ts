import mongoose, { Schema, Document } from "mongoose";

// Kullanıcı modeline ait TypeScript arayüzü
export interface IUser extends Document {
    username: string;             // Kullanıcı Adı
    email: string;                // Email
    password: string;             // Şifre (hashed olarak saklanmalı)
    role: "user" | "admin";       // Kullanıcı Rolü (ör: user, admin)
    createdAt: Date;              // Hesap Oluşturma Tarihi
    updatedAt: Date;              // Hesap Güncelleme Tarihi
}

// Mongoose Şema Tanımı
const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true }, // Kullanıcı adı (zorunlu ve benzersiz)
        email: { type: String, required: true, unique: true },    // Email adresi (zorunlu ve benzersiz)
        password: { type: String, required: true },               // Şifre (hashlenmiş)
        role: { type: String, enum: ["user", "admin"], default: "user" }, // Kullanıcı rolü
    },
    {
        timestamps: true, // createdAt ve updatedAt otomatik olarak yönetilir
    }
);

// Modeli dışa aktar
export default mongoose.model<IUser>("User", UserSchema);
