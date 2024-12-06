import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for MediaScan
interface IMediaScan extends Document {
  taramaDonemi: string;
  olayKategorisi: string;
  olayOzeti: string;
  kanitLinkleri: string[];
  dosyaYukleme: string;
  createdAt?: Date;
  updatedAt?: Date;
  relatedCase?: mongoose.Types.ObjectId; // Reference to CaseTracking
  tags?: string[]; // Array of tags for categorization
}

// Schema Definition
const MediaScanSchema: Schema = new Schema(
  {
    taramaDonemi: { type: String, required: true },
    olayKategorisi: { type: String, required: true },
    olayOzeti: { type: String, required: true },
    kanitLinkleri: { type: [String], required: true },
    dosyaYukleme: { type: String, required: true },
    relatedCase: { type: mongoose.Schema.Types.ObjectId, ref: "CaseTracking" }, // Establish relationship
    tags: { type: [String], default: [] }, // Default to an empty array
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the MediaScan model
const MediaScan: Model<IMediaScan> = mongoose.model<IMediaScan>("MediaScan", MediaScanSchema);

export default MediaScan;
