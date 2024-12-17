import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import applicationTypeRoutes from "./routes/applicationTypeRoutes";
import lawsuitInfoRoutes from "./routes/lawsuitInfoRoutes";
import caseTrackingRoutes from "./routes/caseTrackingRoutes";
import mediaScanRoutes from "./routes/mediaScanRoutes";

const app = express();
const PORT = 5000;

// Orta katmanlar
app.use(express.json());

// Rotaları tanımlama
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/application-types", applicationTypeRoutes);
app.use("/api/lawsuits", lawsuitInfoRoutes);
app.use("/api/case-tracking", caseTrackingRoutes);
app.use("/api/media-scans", mediaScanRoutes);

// Veritabanına bağlan
mongoose.connect("mongodb+srv://admin:admin123@cluster0.2q0ss.mongodb.net/")
    .then(() => {
        console.log("MongoDB'ye bağlanıldı!");
        app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor!`));
    })
    .catch((err) => console.error("MongoDB bağlantı hatası:", err));
