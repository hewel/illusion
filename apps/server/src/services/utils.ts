import {
	array as A,
	option as O,
	taskEither as TE,
	string as S,
} from "fp-ts";
import { pipe, flow } from "fp-ts/function";
import * as cheerio from "cheerio";
import got from "got";
import { findById } from "./tmdb/findById.js";
import { MovieSchema } from "./neodb/types.js";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const url = (url: string, params: Record<string, any>) => {
	const path = url.endsWith("/") ? url.slice(0, url.length - 1) : url;
	const search = new URLSearchParams(params);
	return `${path}?${search.toString()}`;
};

export const scraper = got.extend({
	responseType: "text",
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
	},
});

const isDouban = flow(S.toLowerCase, S.includes("douban"));
const isImdb = flow(S.toLowerCase, S.includes("imdb"));
const isTmdb = flow(S.toLowerCase, S.includes("themoviedb"));
export const getMediaIDRecord = (item: MovieSchema) => {
	const urlList = pipe(
		item,
		O.fromNullableK(({ external_resources }) => external_resources),
		O.map(A.map(({ url }) => url)),
	);

	const doubanId = pipe(
		urlList,
		O.flatMap(A.findFirst(isDouban)),
		O.bindTo("doubanUrl"),
		O.bind("doubanId", ({ doubanUrl }) =>
			O.fromNullable(doubanUrl.match(/\/subject\/(\d+)/)?.[1]),
		),
	);
	const tmdbId = pipe(
		urlList,
		O.flatMap(A.findFirst(isTmdb)),
		O.flatMap((u) => O.fromNullable(u.match(/movie\/(\d+)/)?.[1])),
		TE.fromOption(() => "tmdb id not found"),
	);
	const imdbId = pipe(
		urlList,
		O.flatMap(A.findFirst(isImdb)),
		O.flatMap((u) => O.fromNullable(u.match(/tt\d+/)?.[0])),
		TE.fromOption(() => "imdb url not found"),
	);

	const extractId = ($: cheerio.CheerioAPI) =>
		pipe(
			$("#info")
				.contents()
				.toArray()
				.find((el) => $(el).text().trim().toLowerCase().includes("imdb")),
			O.fromNullable,
			O.flatMap((el) => O.fromNullable(el.next)),
			O.map((el) => $(el).text().trim()),
		);
	const getImdbIdFromDouban = pipe(
		doubanId,
		TE.fromOption(() => "douban url not found"),
		TE.flatMap(
			TE.tryCatchK(({ doubanUrl }) => scraper.get(doubanUrl).buffer(), String),
		),
		TE.map((buffer) => cheerio.load(buffer)),
		TE.flatMapOption(extractId, () => "imdb info not found from douban page"),
	);
	const getTmdbIdByImdbId = pipe(
		imdbId,
		TE.flatMap((id) =>
			findById({
				id,
				source: "imdb_id",
			}),
		),
		TE.flatMapNullable(
			({ movie_results, tv_results }) =>
				(movie_results?.length
					? movie_results
					: tv_results?.length
					? tv_results
					: [])?.[0].id?.toString(),
			() => "result not found",
		),
	);

	return pipe(
		doubanId,
		O.map(({ doubanId }) => doubanId),
		O.orElse(() => O.of(null)),
		O.bindTo("doubanId"),
		TE.fromOption(() => "douban id not found"),
		TE.bindW(
			"imdbId",
			flow(
				() => imdbId,
				TE.orElse(() => getImdbIdFromDouban),
				TE.orElseW(() => TE.of(null)),
			),
		),
		TE.bindW(
			"tmdbId",
			flow(
				() => tmdbId,
				TE.orElse(() => getTmdbIdByImdbId),
				TE.orElseW(() => TE.of(null)),
			),
		),
	);
};
