/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResourceSchema } from "./ExternalResourceSchema.js";
import type { ItemCategory } from "./ItemCategory.js";

export type PodcastSchema = {
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
	genre: Array<string>;
	hosts: Array<string>;
	official_site?: string;
};
