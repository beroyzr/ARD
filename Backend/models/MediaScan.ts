import mongoose, { Schema, Document, Model } from "mongoose";

interface IMediaScan extends Document {
  taramaDonemi: string;
  olayKategorisi: string;
  olayOzeti: string;
  kanitLinkleri: string[];
  dosyaYukleme: string;
}

const MediaScanSchema: Schema = new Schema({
  taramaDonemi: { type: String, required: true },
  olayKategorisi: { type: String, required: true },
  olayOzeti: { type: String, required: true },
  kanitLinkleri: { type: [String], required: true },
  dosyaYukleme: { type: String, required: true },
});

const MediaScan: Model<IMediaScan> = mongoose.model<IMediaScan>("MediaScan", MediaScanSchema);

export default MediaScan;