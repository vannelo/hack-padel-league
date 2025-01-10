/*
  Warnings:

  - You are about to drop the `Couple` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Round` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TournamentRoundStatus" AS ENUM ('Upcoming', 'InProgress', 'Completed');

-- CreateEnum
CREATE TYPE "TournamentMatchStatus" AS ENUM ('Scheduled', 'InProgress', 'Completed');

-- DropForeignKey
ALTER TABLE "Couple" DROP CONSTRAINT "Couple_player1Id_fkey";

-- DropForeignKey
ALTER TABLE "Couple" DROP CONSTRAINT "Couple_player2Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_couple1Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_couple2Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_roundId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "_TournamentCouples" DROP CONSTRAINT "_TournamentCouples_A_fkey";

-- DropForeignKey
ALTER TABLE "_TournamentCouples" DROP CONSTRAINT "_TournamentCouples_B_fkey";

-- DropForeignKey
ALTER TABLE "_TournamentWinners" DROP CONSTRAINT "_TournamentWinners_A_fkey";

-- DropForeignKey
ALTER TABLE "_TournamentWinners" DROP CONSTRAINT "_TournamentWinners_B_fkey";

-- DropTable
DROP TABLE "Couple";

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "Round";

-- DropEnum
DROP TYPE "MatchStatus";

-- DropEnum
DROP TYPE "RoundStatus";

-- CreateTable
CREATE TABLE "TournamentCouple" (
    "id" TEXT NOT NULL,
    "player1Id" TEXT NOT NULL,
    "player2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentCouple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentRound" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "status" "TournamentRoundStatus" NOT NULL DEFAULT 'Upcoming',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentMatch" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "couple1Id" TEXT NOT NULL,
    "couple2Id" TEXT NOT NULL,
    "couple1Score" INTEGER,
    "couple2Score" INTEGER,
    "status" "TournamentMatchStatus" NOT NULL DEFAULT 'Scheduled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentMatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TournamentCouple" ADD CONSTRAINT "TournamentCouple_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentCouple" ADD CONSTRAINT "TournamentCouple_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentRound" ADD CONSTRAINT "TournamentRound_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentMatch" ADD CONSTRAINT "TournamentMatch_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "TournamentRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentMatch" ADD CONSTRAINT "TournamentMatch_couple1Id_fkey" FOREIGN KEY ("couple1Id") REFERENCES "TournamentCouple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentMatch" ADD CONSTRAINT "TournamentMatch_couple2Id_fkey" FOREIGN KEY ("couple2Id") REFERENCES "TournamentCouple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentCouples" ADD CONSTRAINT "_TournamentCouples_A_fkey" FOREIGN KEY ("A") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentCouples" ADD CONSTRAINT "_TournamentCouples_B_fkey" FOREIGN KEY ("B") REFERENCES "TournamentCouple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentWinners" ADD CONSTRAINT "_TournamentWinners_A_fkey" FOREIGN KEY ("A") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentWinners" ADD CONSTRAINT "_TournamentWinners_B_fkey" FOREIGN KEY ("B") REFERENCES "TournamentCouple"("id") ON DELETE CASCADE ON UPDATE CASCADE;
