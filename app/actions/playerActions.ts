"use server";

import { playerService } from "@/domain";

// eslint-disable-next-line
export async function createPlayer(playerData: any): Promise<any> {
  const newPlayer = await playerService.createPlayer(playerData);
  return newPlayer;
}

export async function updatePlayer(
  playerId: string,
  // eslint-disable-next-line
  playerData: any
): Promise<void> {
  await playerService.updatePlayer(playerId, playerData);
}

export async function deletePlayer(playerId: string): Promise<void> {
  await playerService.deletePlayer(playerId);
}

// eslint-disable-next-line
export async function getAllPlayers(): Promise<any> {
  return await playerService.getAllPlayers();
}
