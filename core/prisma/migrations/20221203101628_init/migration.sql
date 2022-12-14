-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
