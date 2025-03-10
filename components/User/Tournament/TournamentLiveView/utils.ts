import { TournamentRoundStatus } from '@prisma/client';

import { TournamentCouple, TournamentRound } from '@/types/tournament';

export const getTournamentActiveRound = (rounds: TournamentRound[]) => {
  return rounds.find(
    (round) => round.status === TournamentRoundStatus.InProgress
  );
};

export const getTournamentPreviousRound = (
  currentRoundNumber: number,
  rounds: TournamentRound[]
) => {
  return rounds.find((round) => round.number === currentRoundNumber - 1);
};

export const getTournamentNextRound = (
  currentRoundNumber: number,
  rounds: TournamentRound[]
) => {
  return rounds.find((round) => round.number === currentRoundNumber + 1);
};

export const getTournamentWinners = (tournamentCouples: TournamentCouple[]) => {
  const firstCouple = tournamentCouples[0];

  const winners = tournamentCouples.filter(
    (couple) => couple.score === firstCouple.score
  );

  return winners;
};
