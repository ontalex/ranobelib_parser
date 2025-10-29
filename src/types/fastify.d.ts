import "fastify";
import mongoose from "mongoose";

declare module "fastify" {
    interface FastifyInstance {
        mongoose: typeof mongoose;
    }
}
