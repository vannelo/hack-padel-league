import { LeagueStatus, TournamentStatus, TournamentType } from '@prisma/client';

import { LeagueRepository } from '@/domain/repositories/LeagueRepository';
import { TournamentService } from '@/domain/services/TournamentService';
import {
  AddPlayerToLeagueData,
  CreateLeagueData,
  LeaguePlayer,
} from '@/types/league';

export class LeagueService {
  private leagueRepository = new LeagueRepository();
  private tournamentService = new TournamentService();

  async createLeague(data: CreateLeagueData) {
    return this.leagueRepository.createLeague(data);
  }

  async deleteLeague(id: string) {
    await this.leagueRepository.deleteLeague(id);
  }

  async getAllLeagues() {
    return this.leagueRepository.getAllLeagues();
  }

  async getLeagueById(id: string) {
    return this.leagueRepository.getLeagueById(id);
  }

  async addPlayerToLeague(data: AddPlayerToLeagueData) {
    return this.leagueRepository.addPlayerToLeague(data);
  }

  async startLeague(leagueId: string) {
    const league = await this.leagueRepository.getLeagueById(leagueId);
    if (!league) throw new Error('League not found.');

    const rounds = this.generateLeagueRounds(league.players);

    try {
      const createdRounds = await this.leagueRepository.createRoundsAndCouples(
        leagueId,
        rounds
      );

      for (const round of createdRounds) {
        const tournamentData = {
          name: `${league.name} - Jornada ${round.number}`,
          type: TournamentType.League,
          status: TournamentStatus.Upcoming,
          // TODO: Make this configurable
          availableCourts: 3,
          leagueId,
        };

        const tournament =
          await this.tournamentService.createTournament(tournamentData);

        for (const couple of round.couples) {
          await this.tournamentService.addCoupleToTournament(tournament.id, {
            player1Id: couple.player1Id,
            player2Id: couple.player2Id,
          });
        }

        await this.leagueRepository.updateRoundTournament(
          round.id,
          tournament.id
        );
      }

      await this.leagueRepository.updateLeagueStartDate(leagueId, new Date());

      return await this.leagueRepository.updateLeagueStatus(
        leagueId,
        LeagueStatus.InProgress
      );
    } catch (error) {
      console.error('Error starting league:', error);
      throw new Error('Failed to start league. Please try again.');
    }
  }

  private generateLeagueRounds(players: LeaguePlayer[]) {
    const playerIds = players.map((player) => player.playerId);
    const totalRounds = playerIds.length - 1;
    const rounds = [];

    for (let roundNumber = 0; roundNumber < totalRounds; roundNumber++) {
      const round: {
        number: number;
        couples: { player1Id: string; player2Id: string }[];
      } = { number: roundNumber + 1, couples: [] };

      for (let i = 0; i < playerIds.length / 2; i++) {
        const player1Id = playerIds[i];
        const player2Id = playerIds[playerIds.length - 1 - i];

        round.couples.push({ player1Id, player2Id });
      }

      const fixedPlayer = playerIds[0];
      playerIds.splice(1, 0, playerIds.pop()!);
      playerIds[0] = fixedPlayer;

      rounds.push(round);
    }

    return rounds;
  }

  async finishLeague(leagueId: string) {
    const league = await this.leagueRepository.getLeagueById(leagueId);
    if (!league) throw new Error('League not found.');

    const updatedLeague = await this.leagueRepository.updateLeagueStatus(
      leagueId,
      LeagueStatus.Completed
    );

    return updatedLeague;
  }

  async updatePlayerScore(playerId: string, newScore: number) {
    return this.leagueRepository.updatePlayerScore(playerId, newScore);
  }
}
