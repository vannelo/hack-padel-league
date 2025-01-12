/*
  Warnings:

  - A unique constraint covering the columns `[leagueRoundId]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "leagueRoundId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_leagueRoundId_key" ON "Tournament"("leagueRoundId");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_leagueRoundId_fkey" FOREIGN KEY ("leagueRoundId") REFERENCES "LeagueRound"("id") ON DELETE SET NULL ON UPDATE CASCADE;
