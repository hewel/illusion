import { taskEither as TE, predicate as P } from "fp-ts";
import type { Got } from "got";

import type { MovieSchema } from "./types.js";

export const getMovie = TE.tryCatchK(
	(request: Got, uuid: string) =>
		request.get(`api/movie/${uuid}`).json<MovieSchema>(),
	String,
);
