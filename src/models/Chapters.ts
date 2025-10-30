import mongoose from "mongoose";

export interface ChapterDoc extends mongoose.Document {
    id_chapter: number;
    index_chapter: number;
    volume: string;
    number: string;
    number_secondary: string;
    name: string;
}

const ChapterSchema = new mongoose.Schema<ChapterDoc>({}, { timestamps: true });

export const Chapter =
    mongoose.models.Chapter ||
    mongoose.model<ChapterDoc>("Chapter", ChapterSchema);
