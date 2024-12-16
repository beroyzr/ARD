import mongoose, { Schema, Document } from "mongoose";

// LawsuitInfo modeli için interface tanımı
export interface ILawsuitInfo extends Document {
    lawsuitNumber: string;       // Dava numarası
    caseName: string;            // Dava adı
    plaintiff: string;           // Davacı
    defendant: string;           // Davalı
    courtName: string;           // Mahkeme adı
    hearingDate: Date;           // Duruşma tarihi
    caseDescription: string;     // Dava açıklaması
    relatedDocuments: {          // İlgili belgeler
        documentName: string;    // Belge adı
        documentPath: string;    // Belge dosya yolu
    }[];
}

// LawsuitInfo için schema tanımı
const LawsuitInfoSchema: Schema = new Schema({
    lawsuitNumber: { type: String, required: true },  // Dava numarası
    caseName: { type: String, required: true },       // Dava adı
    plaintiff: { type: String, required: true },      // Davacı
    defendant: { type: String, required: true },      // Davalı
    courtName: { type: String, required: true },      // Mahkeme adı
    hearingDate: { type: Date, required: true },      // Duruşma tarihi
    caseDescription: { type: String, required: false }, // Dava açıklaması
    relatedDocuments: [                              // İlgili belgeler
        {
            documentName: { type: String, required: true },
            documentPath: { type: String, required: true }
        }
    ]
});

// LawsuitInfo modelini export et
export default mongoose.model<ILawsuitInfo>("LawsuitInfo", LawsuitInfoSchema);
