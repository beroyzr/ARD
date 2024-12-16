import mongoose, { Schema, Document } from "mongoose";

// Define the interface for ApplicationType
export interface IApplicationType extends Document {
    name: string; // Tür Adı (Medya Taraması, STK Verileri vb.)
    description?: string; // Tür Açıklaması
    attributes: {
        scanningPeriod?: string; // Tarama Dönemi
        eventCategory?: string; // Olay Kategorisi
        eventSummary?: string; // Olay Özeti
        source?: string; // Kaynak (Web sitesi, Gazete vb.)
        link?: string; // Link
        visualLink?: string; // Görsel Link
        fileUpload?: string; // Dosya Yükleme
        reportingInstitution?: string; // Bildirim Kurumu (STK Verileri için)
        publicInstitution?: string; // Kamu Kurumu (Kamu Kurumları için)
        commissionName?: string; // Baro Komisyonları için Komisyon Adı
    };
    isActive: boolean; // Tür aktif mi?
}

// Define the schema for ApplicationType
const ApplicationTypeSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true }, // Tür Adı
    description: { type: String, required: false }, // Tür Açıklaması
    attributes: {
        scanningPeriod: { type: String, required: false }, // Tarama Dönemi
        eventCategory: { type: String, required: false }, // Olay Kategorisi
        eventSummary: { type: String, required: false }, // Olay Özeti
        source: { type: String, required: false }, // Kaynak
        link: { type: String, required: false }, // Link
        visualLink: { type: String, required: false }, // Görsel Link
        fileUpload: { type: String, required: false }, // Dosya Yükleme
        reportingInstitution: { type: String, required: false }, // Bildirim Kurumu
        publicInstitution: { type: String, required: false }, // Kamu Kurumu
        commissionName: { type: String, required: false } // Baro Komisyonları için
    },
    isActive: { type: Boolean, default: true } // Aktiflik durumu
});

// Export the model
export default mongoose.model<IApplicationType>("ApplicationType", ApplicationTypeSchema);
