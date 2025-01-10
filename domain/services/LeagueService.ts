import { LeagueRepository } from "@/domain/repositories/LeagueRepository";
import { LeagueStatus } from "@prisma/client";

export class LeagueService {
  private leagueRepository = new LeagueRepository();

  // eslint-disable-next-line
  async createLeague(data: any) {
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

  // eslint-disable-next-line
  async addPlayerToLeague(data: any) {
    return this.leagueRepository.addPlayerToLeague(data);
  }

  async startLeague(leagueId: string) {
    const league = await this.leagueRepository.getLeagueById(leagueId);

    if (!league) {
      throw new Error("League not found.");
    }

    if (league.status !== LeagueStatus.Upcoming) {
      throw new Error("Only upcoming leagues can be started.");
    }

    if (league.players.length < 2) {
      throw new Error("A league must have at least 2 players to start.");
    }

    // Generate rounds and couples
    const rounds = this.generateLeagueRounds(league.players);

    try {
      await this.leagueRepository.createRoundsAndCouples(leagueId, rounds);
      return await this.leagueRepository.updateLeagueStatus(
        leagueId,
        LeagueStatus.InProgress
      );
    } catch (error) {
      console.error("Error starting league:", error);
      throw new Error("Failed to start league. Please try again.");
    }
  }

  private generateLeagueRounds(
    // eslint-disable-next-line
    players: any
  ): { number: number; couples: { player1Id: string; player2Id: string }[] }[] {
    // eslint-disable-next-line
    const playerIds = players.map((player: any) => player.playerId);
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

      // Rotate players for next round
      const fixedPlayer = playerIds[0];
      playerIds.splice(1, 0, playerIds.pop()!);
      playerIds[0] = fixedPlayer;

      rounds.push(round);
    }

    return rounds;
  }
}
