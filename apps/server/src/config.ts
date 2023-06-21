import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { task as T, readonlyRecord as R, either as E } from "fp-ts";
import { pipe } from "fp-ts/function";

import "dotenv/config";

export type Config = {
	port: string;
	tmdbApiUrl: string;
	tmdbToken?: string;
	neoDBUrl: string;
	neoDBToken?: string;
	libraryPaths?: string[];
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const adapter = new JSONFile<Config>(join(__dirname, "Illusion.config.json"));
const defaultConfig: Config = {
	port: process.env.PORT ?? "3333",
	tmdbApiUrl: "https://api.themoviedb.org/3",
	tmdbToken: process.env.TMDB_TOKEN,
	neoDBUrl: "https://neodb.social",
	neoDBToken: process.env.NEODB_TOKEN,
};

export const configDB = new Low(adapter, defaultConfig);

export const configTask = pipe(
	() => configDB.read(),
	T.map(() => configDB.data),
);

export type ConfigTask = typeof configTask;

export const pickConfig = <K extends keyof Config>(keys: K[]) => {
	const traverseByKeys = (c: Config) =>
		R.sequence(E.Applicative)(
			R.fromEntries(
				keys.map((key) => [
					key,
					E.fromNullable(`${key} in config not find`)(c[key]),
				]),
			),
		) as E.Either<
			string,
			{
				[P in K]-?: NonNullable<Config[P]>;
			}
		>;

	return T.map(traverseByKeys)(configTask);
};
