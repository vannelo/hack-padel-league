-- DropForeignKey
ALTER TABLE "LeagueRoundCouple" DROP CONSTRAINT "LeagueRoundCouple_player1Id_fkey";

-- DropForeignKey
ALTER TABLE "LeagueRoundCouple" DROP CONSTRAINT "LeagueRoundCouple_player2Id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentCouple" DROP CONSTRAINT "TournamentCouple_player1Id_fkey";

-- DropForeignKey
ALTER TABLE "TournamentCouple" DROP CONSTRAINT "TournamentCouple_player2Id_fkey";

-- AddForeignKey
ALTER TABLE "LeagueRoundCouple" ADD CONSTRAINT "LeagueRoundCouple_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRoundCouple" ADD CONSTRAINT "LeagueRoundCouple_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentCouple" ADD CONSTRAINT "TournamentCouple_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentCouple" ADD CONSTRAINT "TournamentCouple_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
