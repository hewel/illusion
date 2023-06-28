/*
  Warnings:

  - You are about to drop the column `libraryId` on the `MediaItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediaItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER,
    "duration" INTEGER,
    "rating" REAL,
    "poster" TEXT,
    "backdrop" TEXT,
    "mediaTypeId" INTEGER NOT NULL,
    "imdbId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MediaItem_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "MediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediaItem" ("backdrop", "createdAt", "description", "duration", "id", "imdbId", "mediaTypeId", "poster", "rating", "title", "updatedAt", "year") SELECT "backdrop", "createdAt", "description", "duration", "id", "imdbId", "mediaTypeId", "poster", "rating", "title", "updatedAt", "year" FROM "MediaItem";
DROP TABLE "MediaItem";
ALTER TABLE "new_MediaItem" RENAME TO "MediaItem";
CREATE UNIQUE INDEX "MediaItem_imdbId_key" ON "MediaItem"("imdbId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
