import { prisma } from "@/lib/prisma";

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

  // eslint-disable-next-line
  async addPlayerToLeague(data: any) {
    return prisma.leaguePlayer.create({
      data,
    });
  }
}
