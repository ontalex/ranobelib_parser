import type { FastifyInstance, FastifyPluginOptions } from "fastify";

export async function registerSecureRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    app.addHook("preHandler", async (req, reply) => {
        // Простейшая проверка API ключа в заголовке
        const apiKey = req.headers["x-api-key"];
        const expected = process.env.API_KEY;
        if (!expected || apiKey !== expected) {
            return reply.code(401).send({ error: "Unauthorized" });
        }
    });

    app.get("/", async () => {
        return { secret: "42" };
    });
}
