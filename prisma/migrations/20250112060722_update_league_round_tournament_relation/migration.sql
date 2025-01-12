/*
  Warnings:

  - You are about to drop the column `leagueRoundId` on the `Tournament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tournamentId]` on the table `LeagueRound` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_leagueRoundId_fkey";

-- DropIndex
DROP INDEX "Tournament_leagueRoundId_key";

-- AlterTable
ALTER TABLE "LeagueRound" ADD COLUMN     "tournamentId" TEXT;

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "leagueRoundId";

-- CreateIndex
CREATE UNIQUE INDEX "LeagueRound_tournamentId_key" ON "LeagueRound"("tournamentId");

-- AddForeignKey
ALTER TABLE "LeagueRound" ADD CONSTRAINT "LeagueRound_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
