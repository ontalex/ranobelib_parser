import fastify from "fastify";
import dotenv from "dotenv";
import { mongoPlugin } from "./plugins/mongoose";
import { registerHealthRoutes } from "./routes/health";
import { registerSecureRoutes } from "./routes/secure";
import { registerTitleRoutes } from "./routes/titles";

dotenv.config();

async function buildServer() {
    const app = fastify({ logger: true, pluginTimeout: 30000 });

    await app.register(mongoPlugin);
    await app.register(registerHealthRoutes, { prefix: "/health" });
    await app.register(registerSecureRoutes, { prefix: "/secure" });
    await app.register(registerTitleRoutes, { prefix: "/titles" });

    return app;
}

async function start() {
    const app = await buildServer();
    const port = Number(process.env.PORT || 3000);
    const host = process.env.HOST || "0.0.0.0";

    try {
        await app.listen({ port, host });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }

    const close = async () => {
        app.log.info("Shutting down...");
        await app.close();
        process.exit(0);
    };

    process.on("SIGINT", close);
    process.on("SIGTERM", close);
}

start();
