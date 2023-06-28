import { taskEither as TE, predicate as P } from "fp-ts";
import type { Got } from "got";
import { neoDBApi } from "./neoDBApi.js";

import type { PagedMarkSchema, ShelfParams } from "./types.js";

export const getShelf = TE.tryCatchK(
	({ type, ...params }: ShelfParams) =>
		neoDBApi
			.get(`api/me/shelf/${type}`, {
				searchParams: params,
			})
			.json<PagedMarkSchema>(),
	String,
);
