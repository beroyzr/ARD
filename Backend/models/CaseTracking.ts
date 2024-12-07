import mongoose, { Document, Schema } from "mongoose";

// Define interface for type safety
export interface ICaseTracking extends Document {
    title: string;
    description: string;
    status: string;
    attachments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Define schema
const CaseTrackingSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["open", "closed", "in-progress"], required: true },
        attachments: [{ type: String }],
    },
    { timestamps: true }
);

// Export model
const CaseTracking = mongoose.model<ICaseTracking>("CaseTracking", CaseTrackingSchema);
export default CaseTracking;
