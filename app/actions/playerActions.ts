'use server';

import { playerService } from '@/domain';
import { CreatePlayerData, Player } from '@/types/player';

export async function createPlayer(playerData: CreatePlayerData) {
  await playerService.createPlayer(playerData);
}

export async function updatePlayer(playerId: string, data: Partial<Player>) {
  await playerService.updatePlayer(playerId, data);
}

export async function deletePlayer(playerId: string) {
  await playerService.deletePlayer(playerId);
}

export async function getAllPlayers(): Promise<Player[]> {
  return await playerService.getAllPlayers();
}

export async function getPlayerById(playerId: string): Promise<Player | null> {
  return await playerService.getPlayerById(playerId);
}
