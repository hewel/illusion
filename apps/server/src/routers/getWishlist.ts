import { z } from "zod";
import { taskEither as TE, record as R, option as O, array as A } from "fp-ts";
import { pipe, flow } from "fp-ts/function";
import { evolve } from "fp-ts/struct";

import {
	ShelfTypeSchema,
	ItemCategorySchema,
	PagedMarkSchema,
	neoDBApi,
	tmdbApi,
	getShelf,
	getMovie,
} from "../services/index.js";

import { publicProcedure, router } from "./trpc.js";
import { handleError } from "./handleError.js";

const mergeTmdbInfo = (shelfRes: PagedMarkSchema) =>
	pipe(
		shelfRes,
		evolve({
			data: flow(
				TE.fromNullable("data is empty")<PagedMarkSchema["data"]>,
				TE.flatMap(
					A.traverse(TE.ApplicativePar)(({ item, ...rest }) =>
						pipe(
							getMovie(neoDBApi, item.uuid),
							TE.map((movieItem) => ({
								...rest,
								item: movieItem,
							})),
						),
					),
				),
			),
			pages: TE.fromNullable("pages is empty"),
			count: TE.fromNullable("count is empty"),
		}),
		R.sequence(TE.ApplicativePar),
	);

export const getWishlist = router({
	getWishlist: publicProcedure
		.input(
			z.object({
				type: ShelfTypeSchema.optional(),
				category: ItemCategorySchema,
				page: z.number().optional(),
			}),
		)
		.query(({ input }) =>
			pipe(
				getShelf(neoDBApi, { type: "wishlist", ...input }),
				TE.getOrElse(handleError),
			)(),
		),
});
