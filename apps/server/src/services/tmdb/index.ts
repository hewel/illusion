import got from "got";
import { task as T, taskOption as TO } from "fp-ts";
import { pipe } from "fp-ts/function";
export { discoverMovie, discoverTV } from "./discover.js";

import { pickConfig, configDB, configTask } from "../../config.js";
import type { RightType } from "../../types.js";

export const tmdbApi = got.extend({
	prefixUrl: configDB.data.tmdbApiUrl,
	responseType: "json",
	hooks: {
		init: [
			(option) => {
				pipe(
					configTask,
					T.flatMapIO(() => pickConfig(["tmdbApiUrl", "tmdbToken"])),
					TO.tapIO(({ tmdbToken, tmdbApiUrl }) =>
						() => {
							option.prefixUrl = tmdbApiUrl;
							option.headers = { Authorization: `Bearer ${tmdbToken}` };
						}),
				)();
			},
		],
	},
});

export type TmdbApi = RightType<ReturnType<typeof tmdbApi>>;
