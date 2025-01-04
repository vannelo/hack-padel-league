import { prisma } from "@/lib/prisma";

export class PlayerRepository {
  // eslint-disable-next-line
  async createPlayer(playerData: any): Promise<any> {
    return prisma.player.create({
      data: playerData,
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
  async deletePlayer(id: string): Promise<void> {
    await prisma.player.delete({
      where: { id },
    });
  }

  // eslint-disable-next-line
  async getPlayerById(id: string): Promise<any> {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  // eslint-disable-next-line
  async getAllPlayers(): Promise<any[]> {
    return prisma.player.findMany();
  }
}
