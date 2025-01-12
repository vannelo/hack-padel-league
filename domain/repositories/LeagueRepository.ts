import { prisma } from "@/lib/prisma";
import { LeagueStatus } from "@prisma/client";

export class LeagueRepository {
  // eslint-disable-next-line
  async createLeague(data: any) {
    return prisma.league.create({
      data,
    });
  }

  async deleteLeague(id: string) {
    await prisma.league.delete({
      where: { id },
    });
  }

  async getAllLeagues() {
    return prisma.league.findMany({
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  async getLeagueById(id: string) {
    return prisma.league.findUnique({
      where: { id },
      include: {
        players: {
          include: {
            player: true,
          },
        },
        rounds: {
          include: {
            couples: {
              include: {
                player1: true,
                player2: true,
              },
            },
            tournament: true,
          },
        },
      },
    });
  }

  // eslint-disable-next-line
  async addPlayerToLeague(data: any) {
    return prisma.leaguePlayer.create({
      data,
    });
  }

  async createRoundsAndCouples(
    leagueId: string,
    rounds: {
      number: number;
      couples: { player1Id: string; player2Id: string }[];
    }[]
  ) {
    return prisma.$transaction(
      async (tx) => {
        const createdRounds = [];
        for (const round of rounds) {
          const createdRound = await tx.leagueRound.create({
            data: {
              leagueId,
              number: round.number,
              couples: {
                create: round.couples.map((couple) => ({
                  player1Id: couple.player1Id,
                  player2Id: couple.player2Id,
                })),
              },
            },
            include: {
              couples: true,
            },
          });
          createdRounds.push(createdRound);
        }
        return createdRounds;
      },
      {
        maxWait: 10000, // 10 seconds
        timeout: 60000, // 60 seconds
      }
    );
  }

  async updateRoundTournament(roundId: string, tournamentId: string) {
    return prisma.leagueRound.update({
      where: { id: roundId },
      data: { tournamentId: tournamentId },
    });
  }

  async updateLeagueStatus(leagueId: string, status: LeagueStatus) {
    return prisma.league.update({
      where: { id: leagueId },
      data: { status },
    });
  }
}
