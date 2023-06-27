/*
  Warnings:

  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `filePath` on the `Subtitle` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `MediaItem` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `MediaItem` table. All the data in the column will be lost.
  - Added the required column `downloadPath` to the `Subtitle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdb` to the `MediaItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaTypeId` to the `MediaItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Library";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MediaItemToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MediaItemToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "MediaItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MediaItemToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subtitle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "downloadPath" TEXT NOT NULL,
    "mediaItemId" INTEGER NOT NULL,
    CONSTRAINT "Subtitle_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "MediaItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subtitle" ("id", "language", "mediaItemId") SELECT "id", "language", "mediaItemId" FROM "Subtitle";
DROP TABLE "Subtitle";
ALTER TABLE "new_Subtitle" RENAME TO "Subtitle";
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
    "imdb" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MediaItem_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "MediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MediaItem" ("backdrop", "createdAt", "description", "duration", "id", "libraryId", "poster", "rating", "title", "updatedAt", "year") SELECT "backdrop", "createdAt", "description", "duration", "id", "libraryId", "poster", "rating", "title", "updatedAt", "year" FROM "MediaItem";
DROP TABLE "MediaItem";
ALTER TABLE "new_MediaItem" RENAME TO "MediaItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");

-- CreateIndex
CREATE UNIQUE INDEX "MediaType_name_key" ON "MediaType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaItemToWishlist_AB_unique" ON "_MediaItemToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaItemToWishlist_B_index" ON "_MediaItemToWishlist"("B");
