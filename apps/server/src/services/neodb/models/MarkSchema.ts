/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemSchema } from "./ItemSchema.js";
import type { ShelfType } from "./ShelfType.js";

export type MarkSchema = {
	shelf_type: ShelfType;
	visibility: number;
	item: ItemSchema;
	created_time: string;
	comment_text?: string;
	rating_grade?: number;
	tags: Array<string>;
};
