import type {
    FastifyInstance,
    FastifyPluginOptions,
    RequestGenericInterface,
} from "fastify";
import { Title } from "../models/Title";
import { IChapters } from "../types/ranobelib_api/chapters";

type CreateTitleBody = {
    name?: string;
    sourceId?: string;
    url?: string;
    tags?: string[];
};

type TGetTitleOriginChaptersQuery = {
    title: string;
};

type TFindTitleQuery = {
    name: string;
};

export async function registerTitleRoutes(
    app: FastifyInstance,
    _opts: FastifyPluginOptions
) {
    app.get("/", async () => {
        const res = await fetch("https://api.cdnlibs.org/api/manga/6689--ascendance-of-a-bookworm-novel/chapters");
        const data: IChapters = await res.json();
        return data.data.filter((item, i) => {
            if (item.branches.length !== 1) {
                return item;
            }
        })
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

    app.get<{ Querystring: TGetTitleOriginChaptersQuery }>(
        "/origin-chapters",
        async (request, reply) => {
            const query = request.query;
            try {
                const res = await fetch(
                    `https://api.cdnlibs.org/api/manga/${query.title}/chapters`
                );
                console.log("Chapters API data:", res);
                return res.json();
            } catch (error) {
                console.error("Chapters API error:", error);
                return reply.code(400).send("some error:", error);
            }
        }
    );

    app.get<{Querystring: TFindTitleQuery}>(
        "/find",
        async (request, reply) => {
            const query = request.query;
            try {
                const res = await fetch(
                    `https://api.cdnlibs.org/api/manga?q=${query.name}&site_id[]=3`
                );
                console.log("Find title API data:", res);
                return res.json();
            } catch (error) {
                console.error("Chapters API error:", error);
                return reply.code(400).send("some error:", error);
            }
        }
    )
}
