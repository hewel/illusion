import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { PrismaClient } from "@prisma/client";
import { tmdbApi, neoDBApi } from "./services/index.js";

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: "file:./dev.db",
		},
	},
});

export async function createContext({ req, res }: CreateFastifyContextOptions) {
	return {
		req,
		res,
		prisma,
		tmdbApi,
		neoDBApi,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
