-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('League', 'Casual');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "leagueId" TEXT,
ADD COLUMN     "type" "TournamentType" NOT NULL DEFAULT 'Casual';

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE SET NULL ON UPDATE CASCADE;
