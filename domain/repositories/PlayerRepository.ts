import { prisma } from "@/lib/prisma";
import { CreatePlayerData, Player } from "@/types/player";

export class PlayerRepository {
  async createPlayer(data: CreatePlayerData): Promise<Player> {
    return prisma.player.create({
      data,
    });
  }

  // eslint-disable-next-line
  async updatePlayer(id: string, playerData: any): Promise<any> {
    return prisma.player.update({
      where: { id },
      data: playerData,
    });
  }

  // eslint-disable-next-line
  async deletePlayer(id: string) {
    return this.updatePlayer(id, { status: "Deleted" });
  }

  // eslint-disable-next-line
  async getPlayerById(id: string): Promise<any> {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  // eslint-disable-next-line
  async getAllPlayers(): Promise<any[]> {
    return prisma.player.findMany({
      where: {
        status: "Active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
