import type { FastifyInstance, FastifyPluginOptions } from "fastify";

export async function registerHealthRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    app.get("/", async () => {
        return { status: "ok" };
    });

    app.get("/db", async () => {
        try {
            // Быстрая проверка состояния соединения
            const ready = app.mongoose.connection.readyState; // 1 = connected
            if (ready === 1) {
                return { mongo: "ok" };
            }
            // Попытаться установить соединение, если не подключены
            if (ready === 0) {
                await app.mongoose.connect(
                    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
                );
                return { mongo: "ok" };
            }
            return { mongo: "connecting" };
        } catch (e) {
            app.log.error(e as Error);
            return { mongo: "error" };
        }
    });
}
