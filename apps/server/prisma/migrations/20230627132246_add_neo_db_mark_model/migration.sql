/*
  Warnings:

  - You are about to drop the column `mediaItemId` on the `Subtitle` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `Subtitle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "NeoDBMark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shelf_type" TEXT NOT NULL,
    "visibility" INTEGER NOT NULL,
    "comment_text" TEXT,
    "rating_grade" TEXT,
    "created_time" DATETIME NOT NULL,
    "mediaItemId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NeoDBMark_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "MediaItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_NeoDBMarkToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NeoDBMarkToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "NeoDBMark" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NeoDBMarkToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subtitle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "downloadPath" TEXT NOT NULL,
    "mediaId" INTEGER NOT NULL,
    CONSTRAINT "Subtitle_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subtitle" ("downloadPath", "id", "language") SELECT "downloadPath", "id", "language" FROM "Subtitle";
DROP TABLE "Subtitle";
ALTER TABLE "new_Subtitle" RENAME TO "Subtitle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_NeoDBMarkToTag_AB_unique" ON "_NeoDBMarkToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NeoDBMarkToTag_B_index" ON "_NeoDBMarkToTag"("B");
