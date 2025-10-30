import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import mongoose from "mongoose";

declare module "fastify" {
    interface FastifyInstance {
        mongoose: typeof mongoose;
    }
}

async function mongooseConnector(app: FastifyInstance) {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27417";
    const serverSelectionTimeoutMS = Number(
        process.env.MONGODB_TIMEOUT_MS || 5000
    );

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS,
            dbName: process.env.MONGODB_NAME || "fastify-ts-ranobe-parser",
            user: process.env.MONGODB_USERNAME || "ruser1",
            pass: process.env.MONGODB_PASSWORD || "rpassw1",
        });
    }

    app.decorate("mongoose", mongoose);

    app.addHook("onClose", async () => {
        await mongoose.connection.close();
    });
}

export const mongoPlugin = fp(mongooseConnector, {
    name: "mongoose-plugin",
});
