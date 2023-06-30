import { taskEither as TE, predicate as P } from "fp-ts";
import { neoDBApi } from "./neoDBApi.js";

import type { MovieSchema, TVShowSchema } from "./types.js";

export const getMovie = TE.tryCatchK(
	(uuid: string) => neoDBApi.get(`api/movie/${uuid}`).json<MovieSchema>(),
	String,
);

export const getTv = TE.tryCatchK(
	(uuid: string) => neoDBApi.get(`api/tv/${uuid}`).json<TVShowSchema>(),
	String,
);
