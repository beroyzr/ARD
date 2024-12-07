import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import mediaScanRoutes from './routes/mediaScan';
import caseTrackingRoutes from './routes/caseTracking';

// .env dosyasını yükle
dotenv.config();

// Express uygulaması oluştur
const app: Application = express();

// Orta katmanlar
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Veritabanı bağlantısı
connectDB();

// Rotalar
app.use('/api/mediascan', mediaScanRoutes);
app.use('/api/cases', caseTrackingRoutes); 

// Sunucuyu dinleme
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} üzerinde çalışıyor.`));
