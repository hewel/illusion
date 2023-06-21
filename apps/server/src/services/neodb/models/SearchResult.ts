/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemSchema } from "./ItemSchema.js";

export type SearchResult = {
	data: Array<ItemSchema>;
	pages: number;
	count: number;
};
