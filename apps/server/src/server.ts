import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";
import { createContext } from "./context.js";
import { appRouter } from "./routers/index.js";
import { configDB } from "./config.js";
export * from "./services/index.js";

export type { AppRouter } from "./routers/index.js";

const server = fastify({
	maxParamLength: 5000,
	logger: false,
});
server.register(cors).register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: { router: appRouter, createContext },
});

export const start = async () => {
	try {
		const url = await server.listen({ port: 3000 });
		await configDB.write();
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
	return server;
};

if (!process.versions["electron"]) {
	start();
}
