import { z } from "zod";

export const ItemCategorySchema = z.enum([
	"book",
	"movie",
	"tv",
	"music",
	"game",
	"podcast",
	"fanfic",
	"performance",
	"exhibition",
	"collection",
]);

export type ItemCategory = z.infer<typeof ItemCategorySchema>;
