import { taskEither as TE, predicate as P } from "fp-ts";
import type { Got } from "got";

import { url } from "../utils.js";
import type {
	DiscoverMovie,
	DiscoverMovieParams,
	DiscoverTVParams,
	DiscoverTV,
} from "./types.js";

export const discoverMovie = TE.tryCatchK(
	(request: Got, params: Partial<DiscoverMovieParams>) =>
		request
			.get("discover/movie", {
				searchParams: params as Record<string, string>,
			})
			.json<DiscoverMovie>(),
	String,
);

export const discoverTV = (request: Got) =>
	TE.tryCatchK(
		(params: Partial<DiscoverTVParams>) =>
			request.get(url("discover/tv", params)).json<DiscoverTV>(),
		String,
	);
