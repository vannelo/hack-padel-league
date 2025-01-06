import { TournamentRepository } from "@/domain/repositories/TournamentRepository";

export class TournamentService {
  private tournamentRepository = new TournamentRepository();

  // eslint-disable-next-line
  async createTournament(data: any) {
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

    // Generate rounds and matches
    const matches = this.generateMatches(tournament.couples);
    const rounds = this.splitMatchesIntoRounds(
      matches,
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

  private generateMatches(
    // eslint-disable-next-line
    couples: any[]
  ): { couple1Id: string; couple2Id: string }[] {
    const matches = [];
    for (let i = 0; i < couples.length; i++) {
      for (let j = i + 1; j < couples.length; j++) {
        matches.push({
          couple1Id: couples[i].id,
          couple2Id: couples[j].id,
        });
      }
    }
    return matches;
  }

  private splitMatchesIntoRounds(
    matches: { couple1Id: string; couple2Id: string }[],
    availableCourts: number
  ): { matches: { couple1Id: string; couple2Id: string }[] }[] {
    const rounds = [];
    const unscheduledMatches = new Set(
      matches.map((match) => `${match.couple1Id}-${match.couple2Id}`)
    );

    while (unscheduledMatches.size > 0) {
      const currentRound: {
        matches: { couple1Id: string; couple2Id: string }[];
      } = {
        matches: [],
      };
      const playingCouples = new Set<string>();

      for (const match of matches) {
        const matchKey = `${match.couple1Id}-${match.couple2Id}`;

        // Skip if match is already scheduled or couples are already playing in this round
        if (
          !unscheduledMatches.has(matchKey) ||
          playingCouples.has(match.couple1Id) ||
          playingCouples.has(match.couple2Id)
        ) {
          continue;
        }

        // Add match to the current round
        currentRound.matches.push(match);
        playingCouples.add(match.couple1Id);
        playingCouples.add(match.couple2Id);

        // Mark match as scheduled
        unscheduledMatches.delete(matchKey);

        // Finalize the round if it reaches the available court limit
        if (currentRound.matches.length === availableCourts) {
          break;
        }
      }

      // Add the current round to the list of rounds
      if (currentRound.matches.length > 0) {
        rounds.push(currentRound);
      }
    }

    return rounds;
  }
}
