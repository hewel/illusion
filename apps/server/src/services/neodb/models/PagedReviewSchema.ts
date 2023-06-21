/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReviewSchema } from "./ReviewSchema.js";

export type PagedReviewSchema = {
	data?: Array<ReviewSchema>;
	pages: number;
	count: number;
};
