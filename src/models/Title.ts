import mongoose from "mongoose";

export interface TitleDoc extends mongoose.Document {
    name: string;
    sourceId: string;
    url?: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const TitleSchema = new mongoose.Schema<TitleDoc>(
    {
        name: { type: String, required: true, trim: true },
        sourceId: { type: String, required: true, unique: true, index: true },
        url: { type: String },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const Title =
    mongoose.models.Title || mongoose.model<TitleDoc>("Title", TitleSchema);
