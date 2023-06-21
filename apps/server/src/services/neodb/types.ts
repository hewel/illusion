export type { AlbumSchema } from "./models/AlbumSchema.js";
export type { CrewMemberSchema } from "./models/CrewMemberSchema.js";
export type { EditionSchema } from "./models/EditionSchema.js";
export type { ExternalResourceSchema } from "./models/ExternalResourceSchema.js";
export type { GameSchema } from "./models/GameSchema.js";
import type { ItemCategory } from "./models/ItemCategory.js";
export type { ItemSchema } from "./models/ItemSchema.js";
export type { MarkInSchema } from "./models/MarkInSchema.js";
export type { MarkSchema } from "./models/MarkSchema.js";
export type { MovieSchema } from "./models/MovieSchema.js";
export type { PagedMarkSchema } from "./models/PagedMarkSchema.js";
export type { PagedReviewSchema } from "./models/PagedReviewSchema.js";
export type { PerformanceProductionSchema } from "./models/PerformanceProductionSchema.js";
export type { PerformanceSchema } from "./models/PerformanceSchema.js";
export type { PodcastSchema } from "./models/PodcastSchema.js";
export type { RedirectedResult } from "./models/RedirectedResult.js";
export type { Result } from "./models/Result.js";
export type { ReviewInSchema } from "./models/ReviewInSchema.js";
export type { ReviewSchema } from "./models/ReviewSchema.js";
export type { SearchResult } from "./models/SearchResult.js";
import type { ShelfType } from "./models/ShelfType.js";
export type { TVSeasonSchema } from "./models/TVSeasonSchema.js";
export type { TVShowSchema } from "./models/TVShowSchema.js";
export type { UserSchema } from "./models/UserSchema.js";

import { ShelfTypeSchema } from "./models/ShelfType.js";
import { ItemCategorySchema } from "./models/ItemCategory.js";

export type ShelfParams = {
	type: ShelfType;
	category?: ItemCategory;
	page?: number;
};

export type { ShelfType, ItemCategory };
export { ItemCategorySchema, ShelfTypeSchema };
