import { prisma } from "@/lib/prisma";
import { CreateTournamentData, TournamentCoupleData } from "@/types/tournament";
import {
  TournamentMatchStatus,
  TournamentRoundStatus,
  TournamentStatus,
} from "@prisma/client";

export class TournamentRepository {
  async createTournament(data: CreateTournamentData) {
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
          orderBy: { score: "desc" },
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
        league: true,
      },
    });
  }

  async addCoupleToTournament(
    tournamentId: string,
    data: TournamentCoupleData
  ) {
    const existingCouples = await prisma.tournamentCouple.findMany({
      where: {
        tournaments: {
          some: { id: tournamentId },
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

    return prisma.tournamentCouple.create({
      data: {
        player1: { connect: { id: data.player1Id } },
        player2: { connect: { id: data.player2Id } },
        tournaments: {
          connect: { id: tournamentId },
        },
      },
    });
  }

  async updateTournamentStatus(id: string, status: TournamentStatus) {
    return prisma.tournament.update({
      where: { id },
      data: { status },
      include: {
        couples: {
          include: { player1: true, player2: true },
          orderBy: { score: "desc" },
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
        league: true,
      },
    });
  }

  async createRoundsAndMatches(
    tournamentId: string,
    rounds: { matches: { couple1Id: string; couple2Id: string }[] }[]
  ) {
    return prisma.$transaction(async (tx) => {
      for (let i = 0; i < rounds.length; i++) {
        const round = await tx.tournamentRound.create({
          data: {
            tournament: { connect: { id: tournamentId } },
            number: i + 1,
            status: TournamentRoundStatus.Upcoming,
          },
        });

        await tx.tournamentMatch.createMany({
          data: rounds[i].matches.map((match) => ({
            roundId: round.id,
            couple1Id: match.couple1Id,
            couple2Id: match.couple2Id,
            status: TournamentMatchStatus.Scheduled,
          })),
        });
      }
    });
  }

  async updateMatchScore(data: {
    matchId: string;
    couple1Score: number;
    couple2Score: number;
  }) {
    const updatedMatch = await prisma.$transaction(async (tx) => {
      const match = await tx.tournamentMatch.update({
        where: { id: data.matchId },
        data: {
          couple1Score: data.couple1Score,
          couple2Score: data.couple2Score,
          status: TournamentMatchStatus.Completed,
        },
        include: {
          couple1: true,
          couple2: true,
        },
      });

      await tx.tournamentCouple.update({
        where: { id: match.couple1Id },
        data: {
          score: {
            increment: data.couple1Score,
          },
        },
      });

      await tx.tournamentCouple.update({
        where: { id: match.couple2Id },
        data: {
          score: {
            increment: data.couple2Score,
          },
        },
      });

      return match;
    });

    return updatedMatch;
  }

  async finishTournament(tournamentId: string, winnerCoupleIds: string[]) {
    return prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        status: TournamentStatus.Completed,
        endDate: new Date(),
        winnerCouples: {
          connect: winnerCoupleIds.map((id) => ({ id })),
        },
      },
      include: {
        couples: {
          include: { player1: true, player2: true },
          orderBy: { score: "desc" },
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
        league: true,
      },
    });
  }
}
