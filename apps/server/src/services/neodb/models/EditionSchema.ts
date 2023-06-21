/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResourceSchema } from "./ExternalResourceSchema.js";
import type { ItemCategory } from "./ItemCategory.js";

export type EditionSchema = {
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
	subtitle?: string;
	orig_title?: string;
	author: Array<string>;
	translator: Array<string>;
	language?: string;
	pub_house?: string;
	pub_year?: number;
	pub_month?: number;
	binding?: string;
	price?: string;
	pages?: string;
	series?: string;
	imprint?: string;
	isbn?: string;
};
