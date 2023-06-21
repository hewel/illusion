/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResourceSchema } from "./ExternalResourceSchema.js";
import type { ItemCategory } from "./ItemCategory.js";

export type AlbumSchema = {
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
	other_title: Array<string>;
	genre: Array<string>;
	artist: Array<string>;
	company: Array<string>;
	duration?: number;
	release_date?: string;
	track_list?: string;
	barcode?: string;
};
