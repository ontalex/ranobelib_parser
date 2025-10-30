import mongoose from "mongoose";

export interface TitleDoc extends mongoose.Document {
    chapter_id: number;
    name: string;
    branch_id: number;
    number: number;
    volume: number;
}

const TitleSchema = new mongoose.Schema<TitleDoc>(
    {
        chapter_id: { type: Number, required: true, index: true },
        name: { type: String, required: true, trim: true },
        branch_id: { type: Number },
        number: { type: Number },
        volume: { type: Number },
    },
    { timestamps: true }
);

export const Title =
    mongoose.models.Title || mongoose.model<TitleDoc>("Title", TitleSchema);
