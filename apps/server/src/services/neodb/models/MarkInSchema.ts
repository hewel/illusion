/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ShelfType } from "./ShelfType.js";

export type MarkInSchema = {
	shelf_type: ShelfType;
	visibility: number;
	comment_text?: string;
	rating_grade?: number;
	tags?: Array<string>;
	created_time?: string;
	post_to_fediverse?: boolean;
};
