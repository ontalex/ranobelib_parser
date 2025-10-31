import dotenv from "dotenv";
import mongoose from "mongoose";
import { Title } from "../src/models/Title";

dotenv.config();

async function main() {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        dbName: process.env.MONGODB_NAME,
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD,
    });

    const examples = [
        {
            name: "Sample Ranobe 1",
            sourceId: "sample-1",
            url: "https://example.com/ranobe/1",
            tags: ["fantasy", "adventure"],
        },
        {
            name: "Sample Ranobe 2",
            sourceId: "sample-2",
            url: "https://example.com/ranobe/2",
            tags: ["romance"],
        },
    ];

    for (const doc of examples) {
        await Title.updateOne(
            { sourceId: doc.sourceId },
            { $setOnInsert: doc },
            { upsert: true }
        );
    }

    const count = await Title.countDocuments();
    // eslint-disable-next-line no-console
    console.log(`Seed completed. Titles in DB: ${count}`);
}

main()
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close();
    });
