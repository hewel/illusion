/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CrewMemberSchema } from "./CrewMemberSchema.js";
import type { ExternalResourceSchema } from "./ExternalResourceSchema.js";
import type { ItemCategory } from "./ItemCategory.js";

export type PerformanceProductionSchema = {
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
	orig_title?: string;
	other_title: Array<string>;
	language: Array<string>;
	opening_date?: string;
	closing_date?: string;
	director: Array<string>;
	playwright: Array<string>;
	orig_creator: Array<string>;
	composer: Array<string>;
	choreographer: Array<string>;
	performer: Array<string>;
	actor: Array<CrewMemberSchema>;
	crew: Array<CrewMemberSchema>;
	official_site?: string;
};
