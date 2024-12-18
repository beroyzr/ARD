import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import applicationTypeRoutes from "./routes/applicationTypeRoutes";
import lawsuitInfoRoutes from "./routes/lawsuitInfoRoutes";
import caseTrackingRoutes from "./routes/caseTrackingRoutes";
import mediaScanRoutes from "./routes/mediaScanRoutes";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME || 'ARD';

// Orta katmanlar
app.use(express.json());

// Rotaları tanımlama
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/application-types", applicationTypeRoutes);
app.use("/api/lawsuits", lawsuitInfoRoutes);
app.use("/api/case-tracking", caseTrackingRoutes);
app.use("/api/media-scans", mediaScanRoutes);

// Construct the full MongoDB URI
const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Veritabanına bağlan
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

mongoose.connect(mongoURI)
    .then(() => {
        console.log(`MongoDB ${DB_NAME} veritabanına bağlanıldı!`);
        app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor!`));
    })
    .catch((err) => console.error("MongoDB bağlantı hatası:", err));
