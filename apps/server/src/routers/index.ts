import { taskEither as TE, either as E } from "fp-ts";
import { pipe } from "fp-ts/function";
import { router, publicProcedure, mergeRouters } from "./trpc.js";
import { getWishlist } from "./getWishlist.js";
import { handleError } from "./handleError.js";
import { discoverMovie } from "../services/index.js";

export const appRouter = mergeRouters(
	router({
		getPopularMovieList: publicProcedure.query(({ ctx }) =>
			pipe(
				discoverMovie(ctx.tmdbApi, {
					include_adult: false,
					include_video: false,
					language: "en-US",
					page: 1,
					sort_by: "popularity.desc",
				}),
				TE.getOrElse(handleError),
			)(),
		),
	}),
	getWishlist,
);

export type AppRouter = typeof appRouter;
