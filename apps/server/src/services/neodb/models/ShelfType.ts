import { z } from "zod";

export const ShelfTypeSchema = z.enum(["wishlist", "progress", "complete"]);

export type ShelfType = z.infer<typeof ShelfTypeSchema>;
