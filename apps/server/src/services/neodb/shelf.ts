import { taskEither as TE, predicate as P } from "fp-ts";
import type { Got } from "got";

import type { PagedMarkSchema, ShelfParams } from "./types.js";

export const getShelf = TE.tryCatchK(
	(request: Got, { type, ...params }: ShelfParams) =>
		request
			.get(`api/me/shelf/${type}`, {
				searchParams: params,
			})
			.json<PagedMarkSchema>(),
	String,
);
