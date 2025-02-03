/*
  Warnings:

  - You are about to drop the column `level` on the `League` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "League" DROP COLUMN "level",
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;
