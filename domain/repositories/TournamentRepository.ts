import { prisma } from "@/lib/prisma";
import { TournamentStatus } from "@prisma/client";

export class TournamentRepository {
  // eslint-disable-next-line
  async createTournament(data: any) {
    return prisma.tournament.create({
      data,
    });
  }

  async getAllTournaments() {
    return prisma.tournament.findMany({
      include: {
        couples: {
          include: { player1: true, player2: true },
        },
        rounds: true,
        winnerCouples: {
          include: { player1: true, player2: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getTournamentById(id: string) {
    return prisma.tournament.findUnique({
      where: { id },
      include: {
        couples: {
          include: { player1: true, player2: true },
        },
        rounds: {
          include: {
            matches: {
              include: {
                couple1: {
                  include: { player1: true, player2: true },
                },
                couple2: {
                  include: { player1: true, player2: true },
                },
              },
            },
          },
        },
        winnerCouples: {
          include: { player1: true, player2: true },
        },
      },
    });
  }

  async addCoupleToTournament(data: {
    tournamentId: string;
    player1Id: string;
    player2Id: string;
  }) {
    const existingCouples = await prisma.couple.findMany({
      where: {
        tournaments: {
          some: { id: data.tournamentId },
        },
      },
    });

    const playersInCouples = new Set(
      existingCouples.flatMap((couple) => [couple.player1Id, couple.player2Id])
    );

    if (
      playersInCouples.has(data.player1Id) ||
      playersInCouples.has(data.player2Id)
    ) {
      throw new Error(
        "One or both players are already part of another couple in this tournament."
      );
    }

    if (data.player1Id === data.player2Id) {
      throw new Error("A player cannot be both Player 1 and Player 2.");
    }

    return prisma.couple.create({
      data: {
        player1Id: data.player1Id,
        player2Id: data.player2Id,
        tournaments: {
          connect: { id: data.tournamentId },
        },
      },
    });
  }

  async updateTournamentStatus(id: string, status: TournamentStatus) {
    return prisma.tournament.update({
      where: { id },
      data: { status },
    });
  }

  async createRoundsAndMatches(
    tournamentId: string,
    rounds: { matches: { couple1Id: string; couple2Id: string }[] }[]
  ) {
    for (let i = 0; i < rounds.length; i++) {
      const round = await prisma.round.create({
        data: {
          tournamentId,
          number: i + 1,
          status: "Upcoming",
        },
      });

      await prisma.match.createMany({
        data: rounds[i].matches.map((match) => ({
          roundId: round.id,
          couple1Id: match.couple1Id,
          couple2Id: match.couple2Id,
          status: "Scheduled",
        })),
      });
    }
  }
}
