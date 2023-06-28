import got from "got";
import { task as T, taskOption as TO } from "fp-ts";
import { pipe } from "fp-ts/function";
import { pickConfig, configDB, configTask } from "../../config.js";
import type { RightType } from "../../types.js";

export const tmdbApi = got.extend({
	prefixUrl: configDB.data.tmdbApiUrl,
	responseType: "json",
	headers: { Authorization: `Bearer ${configDB.data.tmdbToken}` },
});

export type TmdbApi = RightType<ReturnType<typeof tmdbApi>>;
