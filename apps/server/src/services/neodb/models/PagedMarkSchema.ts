/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MarkSchema } from "./MarkSchema.js";

export type PagedMarkSchema = {
	data?: Array<MarkSchema>;
	pages: number;
	count: number;
};
