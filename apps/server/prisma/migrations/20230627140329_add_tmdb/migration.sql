/*
  Warnings:

  - You are about to drop the column `imdb` on the `MediaItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaItemId]` on the table `NeoDBMark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbId` to the `MediaItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TmdbDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TmdbDetails_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "libraryId" INTEGER NOT NULL,
    "mediaTypeId" INTEGER NOT NULL,
    "imdbId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MediaItem_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "MediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediaItem" ("backdrop", "createdAt", "description", "duration", "id", "libraryId", "mediaTypeId", "poster", "rating", "title", "updatedAt", "year") SELECT "backdrop", "createdAt", "description", "duration", "id", "libraryId", "mediaTypeId", "poster", "rating", "title", "updatedAt", "year" FROM "MediaItem";
DROP TABLE "MediaItem";
ALTER TABLE "new_MediaItem" RENAME TO "MediaItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TmdbDetails_mediaId_key" ON "TmdbDetails"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "NeoDBMark_mediaItemId_key" ON "NeoDBMark"("mediaItemId");
