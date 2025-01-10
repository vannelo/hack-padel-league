-- CreateTable
CREATE TABLE "LeagueRound" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeagueRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueRoundCouple" (
    "id" TEXT NOT NULL,
    "leagueRoundId" TEXT NOT NULL,
    "player1Id" TEXT NOT NULL,
    "player2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeagueRoundCouple_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeagueRound" ADD CONSTRAINT "LeagueRound_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRoundCouple" ADD CONSTRAINT "LeagueRoundCouple_leagueRoundId_fkey" FOREIGN KEY ("leagueRoundId") REFERENCES "LeagueRound"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRoundCouple" ADD CONSTRAINT "LeagueRoundCouple_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueRoundCouple" ADD CONSTRAINT "LeagueRoundCouple_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
