/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResourceSchema } from "./ExternalResourceSchema.js";
import type { ItemCategory } from "./ItemCategory.js";

export type TVSeasonSchema = {
	uuid: string;
	url: string;
	api_url: string;
	category: ItemCategory;
	parent_uuid?: string;
	display_title: string;
	external_resources?: Array<ExternalResourceSchema>;
	title: string;
	brief: string;
	cover_image_url?: string;
	rating?: number;
	rating_count?: number;
	season_number?: number;
	orig_title?: string;
	other_title: Array<string>;
	director: Array<string>;
	playwright: Array<string>;
	actor: Array<string>;
	genre: Array<string>;
	language: Array<string>;
	area: Array<string>;
	year?: number;
	site?: string;
	episode_count?: number;
};
