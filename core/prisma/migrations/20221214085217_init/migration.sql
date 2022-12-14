-- CreateTable
CREATE TABLE "Contestant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "CfInfoRatting" INTEGER,
    "CfInfoTitlePhoto" TEXT,
    "CfInfoHandle" TEXT,
    "CfInfoAvatar" TEXT,
    "CfInfoFirstName" TEXT,
    "CfInfoRank" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Contestant_id_key" ON "Contestant"("id");
