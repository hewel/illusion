/*
  Warnings:

  - Added the required column `libraryPath` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "libraryPath" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Library" ("description", "id", "name", "type") SELECT "description", "id", "name", "type" FROM "Library";
DROP TABLE "Library";
ALTER TABLE "new_Library" RENAME TO "Library";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
