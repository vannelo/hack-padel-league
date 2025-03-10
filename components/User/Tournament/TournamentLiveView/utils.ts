import { TournamentRoundStatus } from '@prisma/client';

import { TournamentRound } from '@/types/tournament';

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
