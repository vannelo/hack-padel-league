import { PlayerStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { CreatePlayerData, Player } from '@/types/player';

export class PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    return prisma.player.findMany({
      where: {
        status: 'Active',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  async createPlayer(data: CreatePlayerData): Promise<Player> {
    return prisma.player.create({
      data,
    });
  }

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player> {
    return prisma.player.update({
      where: { id },
      data: playerData,
    });
  }

  async deletePlayer(id: string): Promise<Player> {
    return this.updatePlayer(id, { status: PlayerStatus.Deleted });
  }
}
