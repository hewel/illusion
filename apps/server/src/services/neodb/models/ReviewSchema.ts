/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemSchema } from "./ItemSchema.js";

export type ReviewSchema = {
	url: string;
	visibility: number;
	item: ItemSchema;
	created_time: string;
	title: string;
	body: string;
	html_content: string;
};
