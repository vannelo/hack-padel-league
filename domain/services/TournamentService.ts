import { TournamentRepository } from "@/domain/repositories/TournamentRepository";
import { TournamentStatus, TournamentType } from "@prisma/client";

export class TournamentService {
  private tournamentRepository = new TournamentRepository();

  // eslint-disable-next-line
  async createTournament(data: {
    name: string;
    type: TournamentType;
    startDate: Date;
    endDate: Date | null;
    status: TournamentStatus;
    availableCourts: number;
    leagueId?: string;
    leagueRoundId?: string;
  }) {
    return this.tournamentRepository.createTournament(data);
  }

  async getAllTournaments() {
    return this.tournamentRepository.getAllTournaments();
  }

  async getTournamentById(id: string) {
    return this.tournamentRepository.getTournamentById(id);
  }

  async addCoupleToTournament(data: {
    tournamentId: string;
    player1Id: string;
    player2Id: string;
  }) {
    return this.tournamentRepository.addCoupleToTournament(data);
  }

  async startTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.getTournamentById(
      tournamentId
    );

    if (!tournament) {
      throw new Error("Tournament not found.");
    }

    if (tournament.status !== "Upcoming") {
      throw new Error("Only upcoming tournaments can be started.");
    }

    if (tournament.couples.length < 2) {
      throw new Error("A tournament must have at least 2 couples to start.");
    }

    // Generate rounds with optimized logic
    const rounds = this.generateRounds(
      tournament.couples,
      tournament.availableCourts
    );

    await this.tournamentRepository.createRoundsAndMatches(
      tournamentId,
      rounds
    );

    return this.tournamentRepository.updateTournamentStatus(
      tournamentId,
      "InProgress"
    );
  }

  private generateRounds(
    couples: { id: string }[],
    availableCourts: number
  ): { matches: { couple1Id: string; couple2Id: string }[] }[] {
    const totalCouples = couples.length;
    const totalRounds = totalCouples - 1;
    const rounds: { matches: { couple1Id: string; couple2Id: string }[] }[] =
      [];

    // If odd number of couples, add a "bye" couple
    if (totalCouples % 2 !== 0) {
      couples.push({ id: "bye" });
    }

    const n = couples.length;

    for (let round = 0; round < totalRounds; round++) {
      const matches: { couple1Id: string; couple2Id: string }[] = [];

      for (let i = 0; i < n / 2; i++) {
        const couple1 = couples[i];
        const couple2 = couples[n - 1 - i];

        if (couple1.id !== "bye" && couple2.id !== "bye") {
          matches.push({
            couple1Id: couple1.id,
            couple2Id: couple2.id,
          });

          if (matches.length === availableCourts) {
            break;
          }
        }
      }

      rounds.push({ matches });

      // Rotate the array, keeping the first element fixed
      couples = [couples[0], ...couples.slice(-1), ...couples.slice(1, -1)];
    }

    return rounds;
  }

  async updateMatchScore(data: {
    matchId: string;
    couple1Score: number;
    couple2Score: number;
  }) {
    return this.tournamentRepository.updateMatchScore(data);
  }

  async finishTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.getTournamentById(
      tournamentId
    );

    if (!tournament) {
      throw new Error("Tournament not found.");
    }

    if (tournament.status !== TournamentStatus.InProgress) {
      throw new Error("Only in-progress tournaments can be finished.");
    }

    // Determine the winner(s) based on the highest score
    const winnerScore = Math.max(...tournament.couples.map((c) => c.score));
    const winnerCouples = tournament.couples.filter(
      (c) => c.score === winnerScore
    );

    // Update the tournament status and set the winner(s)
    return this.tournamentRepository.finishTournament(
      tournamentId,
      winnerCouples.map((c) => c.id)
    );
  }
}
