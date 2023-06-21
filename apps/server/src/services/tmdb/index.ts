import got from "got";
import { taskEither as TE } from "fp-ts";
import { pipe } from "fp-ts/function";
export { discoverMovie, discoverTV } from "./discover.js";

import { pickConfig, configDB } from "../../config.js";
import type { RightType } from "../../types.js";

export const tmdbApi = got.extend({
	prefixUrl: configDB.data.tmdbApiUrl,
	responseType: "json",
	hooks: {
		beforeRequest: [
			async (option) => {
				await pipe(
					pickConfig(["tmdbApiUrl", "tmdbToken"]),
					TE.tapIO(({ tmdbToken, tmdbApiUrl }) =>
						() => {
							option.prefixUrl = tmdbApiUrl;
							option.headers["Authorization"] = `Bearer ${tmdbToken}`;
						}),
				)();
			},
		],
	},
});

export type TmdbApi = RightType<ReturnType<typeof tmdbApi>>;
