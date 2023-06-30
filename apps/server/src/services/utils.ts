import {
	array as A,
	option as O,
	taskEither as TE,
	string as S,
	console as Console,
} from "fp-ts";
import { pipe, flow } from "fp-ts/function";
import * as cheerio from "cheerio";
import got from "got";
import { findById } from "./index.js";

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

export const getMediaIDRecord = (urlList: string[]) => {
	const isDouban = flow(S.toLowerCase, S.includes("douban"));
	const isImdb = flow(S.toLowerCase, S.includes("imdb"));
	const isTmdb = flow(S.toLowerCase, S.includes("themoviedb"));

	const doubanId = pipe(
		urlList,
		A.findFirst(isDouban),
		O.bindTo("doubanUrl"),
		O.bind("doubanId", ({ doubanUrl }) =>
			O.fromNullable(doubanUrl.match(/\/subject\/(\d+)/)?.[1]),
		),
	);

	const extractId = ($: cheerio.CheerioAPI) =>
		pipe(
			$("#info")
				.contents()
				.toArray()
				.find((el) => $(el).text().trim().toLowerCase().includes("imdb")),
			O.fromNullable,
			O.flatMap((el) => O.fromNullable(el.nextSibling)),
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

	const tmdbId = pipe(
		urlList,
		A.findFirst(isTmdb),
		O.flatMap((u) => O.fromNullable(u.match(/movie\/(\d+)/)?.[1])),
		TE.fromOption(() => "tmdb id not found"),
	);

	const imdbId = pipe(
		urlList,
		A.findFirst(isImdb),
		O.flatMap((u) => O.fromNullable(u.match(/tt\d+/)?.[0])),
		TE.fromOption(() => "imdb url not found"),
		TE.orElse(() => getImdbIdFromDouban),
	);

	return pipe(
		doubanId,
		O.map(({ doubanId }) => doubanId),
		O.orElse(() => O.of(null)),
		O.bindTo("doubanId"),
		TE.fromOption(() => "douban id not found"),
		TE.bindW("imdbId", () => TE.orElseW(() => TE.of(null))(imdbId)),
		TE.bindW("tmdbId", () => TE.orElseW(() => TE.of(null))(tmdbId)),
	);
};
