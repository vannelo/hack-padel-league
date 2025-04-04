import {
  TournamentRoundStatus,
  TournamentStatus,
  TournamentType,
} from '@prisma/client';

import { PUSHER_VALUES } from '@/constants/pusherValues';
import { TournamentRepository } from '@/domain/repositories/TournamentRepository';
import { pusher } from '@/lib/pusher';
import { CreateTournamentData, TournamentCoupleData } from '@/types/tournament';

import { LeagueRepository } from '../repositories/LeagueRepository';

export class TournamentService {
  private tournamentRepository = new TournamentRepository();
  private leagueRepository = new LeagueRepository();

  async createTournament(tournamentData: CreateTournamentData) {
    return this.tournamentRepository.createTournament(tournamentData);
  }

  async getAllTournaments() {
    return this.tournamentRepository.getAllTournaments();
  }

  async getTournamentById(id: string) {
    return this.tournamentRepository.getTournamentById(id);
  }

  async addCoupleToTournament(
    tournamentId: string,
    coupleData: TournamentCoupleData
  ) {
    return this.tournamentRepository.addCoupleToTournament(
      tournamentId,
      coupleData
    );
  }

  async startTournament(tournamentId: string) {
    const tournament =
      await this.tournamentRepository.getTournamentById(tournamentId);

    if (!tournament) {
      throw new Error('Tournament not found.');
    }

    if (tournament.status !== TournamentStatus.Upcoming) {
      throw new Error('Only upcoming tournaments can be started.');
    }

    if (tournament.couples.length < 3) {
      throw new Error('A tournament must have at least 3 couples to start.');
    }

    const rounds = this.generateRounds(
      tournament.couples,
      tournament.availableCourts
    );

    // Create rounds and matches
    await this.tournamentRepository.createRoundsAndMatches(
      tournamentId,
      rounds
    );

    // **Update tournament status to InProgress**
    await this.tournamentRepository.updateTournamentStatus(
      tournamentId,
      TournamentStatus.InProgress
    );

    // **Find the first round and update its status to InProgress**
    const firstRound =
      await this.tournamentRepository.getFirstRound(tournamentId);
    if (firstRound) {
      await this.tournamentRepository.updateRoundStatus(
        firstRound.id,
        TournamentRoundStatus.InProgress
      );
    }

    return tournament;
  }

  private generateRounds(
    couples: { id: string }[],
    availableCourts: number
  ): { matches: { couple1Id: string; couple2Id: string }[] }[] {
    const totalCouples = couples.length;
    const totalRounds = totalCouples - 1;
    const rounds: { matches: { couple1Id: string; couple2Id: string }[] }[] =
      [];
    const n = couples.length;

    for (let round = 0; round < totalRounds; round++) {
      const matches: { couple1Id: string; couple2Id: string }[] = [];

      for (let i = 0; i < n / 2; i++) {
        const couple1 = couples[i];
        const couple2 = couples[n - 1 - i];
        matches.push({
          couple1Id: couple1.id,
          couple2Id: couple2.id,
        });

        if (matches.length === availableCourts) {
          break;
        }
      }

      rounds.push({ matches });
      couples = [couples[0], ...couples.slice(-1), ...couples.slice(1, -1)];
    }

    return rounds;
  }

  async updateMatchScore(data: {
    tournamentId: string;
    roundId: string;
    matchId: string;
    couple1Score: number;
    couple2Score: number;
  }) {
    await this.tournamentRepository.updateMatchScore(data);

    // ✅ Step 1: Check if all matches in this round are completed
    const allMatchesCompleted =
      await this.tournamentRepository.areAllMatchesCompleted(data.roundId);

    if (allMatchesCompleted) {
      // ✅ Step 2: Update the round status to "Completed"
      await this.tournamentRepository.updateRoundStatus(
        data.roundId,
        TournamentRoundStatus.Completed
      );

      // ✅ Step 3: Find the next round and update it to "InProgress" if it exists
      const nextRound = await this.tournamentRepository.getNextRound(
        data.tournamentId,
        data.roundId
      );

      if (nextRound) {
        await this.tournamentRepository.updateRoundStatus(
          nextRound.id,
          TournamentRoundStatus.InProgress
        );
      }
    }

    // ✅ **Only run Pusher trigger in production**
    if (process.env.VERCEL_ENV === 'production') {
      const { channel, event } = PUSHER_VALUES.triggers.scoreUpdate;

      try {
        await pusher.trigger(channel(data.tournamentId), event, {
          matchId: data.matchId,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async finishTournament(tournamentId: string) {
    const tournament =
      await this.tournamentRepository.getTournamentById(tournamentId);

    if (!tournament) {
      throw new Error('Tournament not found.');
    }

    if (tournament.status !== TournamentStatus.InProgress) {
      throw new Error('Only in-progress tournaments can be finished.');
    }

    const winnerScore = Math.max(...tournament.couples.map((c) => c.score));
    const winnerCouples = tournament.couples.filter(
      (c) => c.score === winnerScore
    );

    const updatedTournament = await this.tournamentRepository.finishTournament(
      tournamentId,
      winnerCouples.map((c) => c.id)
    );

    if (tournament.type === TournamentType.League && tournament.leagueId) {
      const playerScores = tournament.couples.flatMap((couple) => [
        { playerId: couple.player1Id, score: couple.score },
        { playerId: couple.player2Id, score: couple.score },
      ]);
      await this.leagueRepository.updatePlayerScores(
        tournament.leagueId,
        playerScores
      );
    }

    return updatedTournament;
  }
}
