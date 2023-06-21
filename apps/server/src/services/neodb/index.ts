import { taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/function";
import got from "got";
import { pickConfig, configDB } from "../../config.js";
export { getShelf } from "./shelf.js";
export { getMovie } from "./getMovie.js";

export * from "./types.js";

export const neoDBApi = got.extend({
	prefixUrl: configDB.data.neoDBUrl,
	responseType: "json",
	hooks: {
		beforeRequest: [
			async (option) => {
				await pipe(
					pickConfig(["neoDBUrl", "neoDBToken"]),
					TE.tapIO(({ neoDBUrl, neoDBToken }) =>
						() => {
							option.prefixUrl = neoDBUrl;
							option.headers["Authorization"] = `Bearer ${neoDBToken}`;
						}),
				)();
			},
		],
	},
});
