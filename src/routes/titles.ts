import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Title } from "../models/Title";

type CreateTitleBody = {
    name?: string;
    sourceId?: string;
    url?: string;
    tags?: string[];
};

export async function registerTitleRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    app.get("/", async () => {
        const items = await Title.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();
        return { items };
    });

    app.post<{ Body: CreateTitleBody }>("/", async (request, reply) => {
        const { name, sourceId, url, tags } = request.body || {};

        if (!name || !sourceId) {
            return reply
                .code(400)
                .send({ error: "name and sourceId are required" });
        }

        if (tags && !Array.isArray(tags)) {
            return reply
                .code(400)
                .send({ error: "tags must be an array of strings" });
        }

        try {
            const created = await Title.create({ name, sourceId, url, tags });
            return reply.code(201).send({ item: created });
        } catch (err: any) {
            if (err?.code === 11000) {
                return reply
                    .code(409)
                    .send({ error: "Title with sourceId already exists" });
            }
            app.log.error(err);
            return reply.code(500).send({ error: "Internal Server Error" });
        }
    });
}
