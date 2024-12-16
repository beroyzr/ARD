import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the model
export interface IApplication extends Document {
    applicationNo: string;         // Başvuru No
    applicantName: string;         // Başvuran Adı Soyadı
    applicationType: string;       // Başvuru Türü
    applicationDate: Date;         // Başvuru Tarihi
    receiver: string;              // Başvuruyu Alan
    lawyer: string;                // Takip Eden Avukat
    violationReason: string;       // Yakınma (İhlal) Nedeni
    applicantType: string;         // Başvuru Türü (Mağdur)
    correspondences: {             // Başvurular/Dileçe Yazışmalar
        document: string;          // Doküman (Dosya Yolu veya Adı)
        documentDescription: string; // Doküman Açıklaması
    }[];
    caseInfo: {                    // Dava Bilgileri
        caseNo: string;            // Dosya No
        court: string;             // Mahkeme
        courtFileNo: string;       // Mahkeme Dosya No
        resultDescription: string; // Sonucu Açıklama
        resultStage: string;       // Sonucu Aşama
    };
}

// Define the schema
const ApplicationSchema: Schema = new Schema({
    applicationNo: { type: String, required: true },  // Başvuru No
    applicantName: { type: String, required: true },  // Başvuran Adı Soyadı
    applicationType: { type: String, required: true }, // Başvuru Türü
    applicationDate: { type: Date, required: true },  // Başvuru Tarihi
    receiver: { type: String, required: true },       // Başvuruyu Alan
    lawyer: { type: String, required: true },         // Takip Eden Avukat
    violationReason: { type: String, required: false }, // Yakınma (İhlal) Nedeni
    applicantType: { type: String, required: true },  // Başvuru Türü (Mağdur)
    correspondences: [                                // Başvurular/Dileçe Yazışmalar
        {
            document: { type: String, required: true }, // Doküman
            documentDescription: { type: String, required: true } // Doküman Açıklaması
        }
    ],
    caseInfo: {                                       // Dava Bilgileri
        caseNo: { type: String, required: true },     // Dosya No
        court: { type: String, required: true },      // Mahkeme
        courtFileNo: { type: String, required: true }, // Mahkeme Dosya No
        resultDescription: { type: String, required: false }, // Sonucu Açıklama
        resultStage: { type: String, required: false } // Sonucu Aşama
    }
});

// Export the model
export default mongoose.model<IApplication>("Application", ApplicationSchema);
