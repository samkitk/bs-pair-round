/*
  Warnings:

  - You are about to drop the `DummyTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DummyTable";

-- CreateTable
CREATE TABLE "URLShortner" (
    "id" SERIAL NOT NULL,
    "short" TEXT NOT NULL,
    "long" TEXT NOT NULL,

    CONSTRAINT "URLShortner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URLShortner_short_key" ON "URLShortner"("short");
