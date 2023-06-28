import { taskEither as TE } from "fp-ts";

import { tmdbApi } from "./tmdbApi.js";

type FindByIdParams = {
	id: string;
	source: "imdb_id" | "tvdb_id";
	language?: string;
};

export interface FindByIDresults {
	movie_results?: MovieResultsEntity[] | null;
	person_results?: null[] | null;
	tv_results?: null[] | null;
	tv_episode_results?: null[] | null;
	tv_season_results?: null[] | null;
}
export interface MovieResultsEntity {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids?: number[] | null;
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export const findById = TE.tryCatchK(
	({ id, source, language }: FindByIdParams) =>
		tmdbApi
			.get(`find/${id}`, {
				searchParams: {
					external_source: source,
					language,
				},
			})
			.json<FindByIDresults>(),
	String,
);
