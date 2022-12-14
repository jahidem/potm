/*
  Warnings:

  - The primary key for the `Contestant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contestant" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL PRIMARY KEY,
    "isValid" BOOLEAN NOT NULL,
    "CfInfoRatting" INTEGER,
    "CfInfoTitlePhoto" TEXT,
    "CfInfoHandle" TEXT,
    "CfInfoAvatar" TEXT,
    "CfInfoFirstName" TEXT,
    "CfInfoRank" TEXT
);
INSERT INTO "new_Contestant" ("CfInfoAvatar", "CfInfoFirstName", "CfInfoHandle", "CfInfoRank", "CfInfoRatting", "CfInfoTitlePhoto", "id", "isValid", "name") SELECT "CfInfoAvatar", "CfInfoFirstName", "CfInfoHandle", "CfInfoRank", "CfInfoRatting", "CfInfoTitlePhoto", "id", "isValid", "name" FROM "Contestant";
DROP TABLE "Contestant";
ALTER TABLE "new_Contestant" RENAME TO "Contestant";
CREATE UNIQUE INDEX "Contestant_name_key" ON "Contestant"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
