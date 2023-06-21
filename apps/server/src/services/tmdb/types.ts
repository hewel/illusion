export type SortBy =
	| "popularity.asc"
	| "popularity.desc"
	| "revenue.asc"
	| "revenue.desc"
	| "primary_release_date.asc"
	| "primary_release_date.desc"
	| "vote_average.asc"
	| "vote_average.desc"
	| "vote_count.asc"
	| "vote_count.desc";

export type Discover<R> = {
	page: number;
	results?: R[] | null;
	total_pages: number;
	total_results: number;
};

export interface DiscoverInfo {
	id: number;
	backdrop_path?: string | null;
	genre_ids?: number[] | null;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

export interface MovieInfo extends DiscoverInfo {
	adult: boolean;
	release_date: string;
	title: string;
	video: boolean;
}

export interface TVInfo extends DiscoverInfo {
	first_air_date: string;
	name: string;
	original_name: string;
}

export type DiscoverMovie = Discover<MovieInfo>;
export type DiscoverTV = Discover<TVInfo>;

export interface DiscoverParams {
	include_adult: boolean;
	language: string;
	page: number;
	sort_by: SortBy | SortBy[];
	"vote_average.gte": number;
	"vote_average.lte": number;
	"vote_count.gte": number;
	"vote_count.lte": number;
	watch_region: string;
	with_companies: string;
	with_genres: string;
	with_keywords: string;
	with_origin_country: string;
	with_original_language: string;
	"with_runtime.gte": number;
	"with_runtime.lte": number;
	with_watch_monetization_types: string;
	with_watch_providers: string;
	without_companies: string;
	without_genres: string;
	without_keywords: string;
	without_watch_providers: string;
}

export interface DiscoverMovieParams extends DiscoverParams {
	certification: string;
	"certification.gte": string;
	"certification.lte": string;
	certification_country: string;
	include_video: boolean;
	primary_release_year: number;
	"primary_release_date.gte": string;
	"primary_release_date.lte": string;
	region: string;
	"release_date.gte": string;
	"release_date.lte": string;
	with_cast: string;
	with_crew: string;
	with_people: string;
	with_release_type: number;
	year: number;
}

export interface DiscoverTVParams extends DiscoverParams {
	"air_date.gte": string;
	"air_date.lte": string;
	first_air_date_year: number;
	"first_air_date.gte": string;
	"first_air_date.lte": string;
	include_null_first_air_dates: boolean;
	screened_theatrically: boolean;
	timezone: string;
	with_networks: number;
	with_status: string;
	with_type: string;
}
