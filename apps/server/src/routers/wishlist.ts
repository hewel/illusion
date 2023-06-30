import { z } from "zod";
import { taskEither as TE, array as A } from "fp-ts";
import { pipe, flow } from "fp-ts/function";

import {
	ShelfTypeSchema,
	ItemCategorySchema,
	PagedMarkSchema,
	getShelf,
	getMovie,
	getTv,
	findById,
	ItemSchema,
	MovieSchema,
	TVShowSchema,
} from "../services/index.js";

import { publicProcedure, router } from "./trpc.js";
import { handleError } from "./handleError.js";
import { RightTaskType } from "../types.js";
import { PrismaClient } from "@prisma/client";
import { getMediaIDRecord } from "../services/utils.js";

const mergeTmdbInfo = (shelfRes: PagedMarkSchema) => {
	const getDetail = flow(
		TE.fromNullable("item not found")<ItemSchema>,
		TE.flatMap(
			({
				uuid,
				category,
			}): TE.TaskEither<string, MovieSchema | TVShowSchema> => {
				if (category === "movie") return getMovie(uuid);
				if (category === "tv") return getTv(uuid);
				return TE.left(`category ${category} not support`);
			},
		),
		TE.bindTo("item"),
		TE.bind("externalId", ({ item }) => getMediaIDRecord(item)),
		TE.bind(
			"detail",
			flow(
				TE.fromNullableK("imdbid not found")(
					({ externalId }) => externalId.imdbId,
				),
				TE.flatMap((id) => findById({ id, source: "imdb_id" })),
				TE.flatMap(({ movie_results }) =>
					TE.fromNullable("result not found")(movie_results?.[0]),
				),
				TE.orElseW(() => TE.of<string, null>(null)),
			),
		),
	);

	return pipe(
		TE.Do,
		TE.let("count", () => shelfRes.count),
		TE.let("pages", () => shelfRes.pages),
		TE.bind("data", () =>
			pipe(
				shelfRes.data,
				TE.fromNullable("data is empty"),
				TE.flatMap(
					A.traverse(TE.ApplicativePar)((data) =>
						pipe(
							getDetail(data.item),
							TE.map((detailData) => ({ ...data, ...detailData })),
						),
					),
				),
			),
		),
	);
};

const syncToDatabase = TE.tryCatchK(
	async (
		data: RightTaskType<ReturnType<typeof mergeTmdbInfo>>["data"][number],
		prisma: PrismaClient,
	) => {},
	String,
);

export const wishlist = router({
	get: publicProcedure.query(({ ctx }) => ctx.prisma.wishlist.findMany()),
	sync: publicProcedure.mutation(({ ctx }) =>
		pipe(
			getShelf({
				type: "wishlist",
				category: "movie",
			}),
			TE.flatMap(mergeTmdbInfo),
			// TE.tap(
			// 	TE.tryCatchK(
			// 		({ data }) =>
			// 			Promise.all(
			// 				data.map(({ comment_text, item, detail }) =>
			// 					ctx.prisma.wishlist.create({
			// 						data: {
			// 							name: comment_text ?? "",
			// 							user: {
			// 								connect: {
			// 									account: "admin",
			// 								},
			// 							},
			// 							media: item.imdb
			// 								? {
			// 										connectOrCreate: {
			// 											where: {
			// 												imdbId: item.imdb,
			// 											},
			// 											create: {
			// 												imdbId: item.imdb,
			// 												title: item.title,
			// 												poster: detail?.movie_results?.[0].poster_path,
			// 												description: detail?.movie_results?.[0].overview,
			// 												mediaType: {
			// 													connect: {
			// 														name: "movie",
			// 													},
			// 												},
			// 											},
			// 										},
			// 								  }
			// 								: {},
			// 						},
			// 					}),
			// 				),
			// 			),
			// 		String,
			// 	),
			// ),
			TE.getOrElse(handleError),
		)(),
	),
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
				getShelf({ type: "wishlist", ...input }),
				TE.getOrElse(handleError),
			)(),
		),
});
