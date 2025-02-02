"use server";

import { appRoutes } from "@/constants/appRoutes";
import { playerService } from "@/domain";
import { CreatePlayerData, Player } from "@/types/player";
import { revalidatePath } from "next/cache";

export async function createPlayer(
  playerData: CreatePlayerData
): Promise<Player> {
  return await playerService.createPlayer(playerData);
}

export async function updatePlayer(playerId: string, data: Partial<Player>) {
  await playerService.updatePlayer(playerId, data);
  revalidatePath(appRoutes.players.index);
}

export async function deletePlayer(playerId: string) {
  await playerService.deletePlayer(playerId);
  revalidatePath(appRoutes.players.index);
}

export async function getAllPlayers(): Promise<Player[]> {
  return await playerService.getAllPlayers();
}

export async function getPlayerById(playerId: string): Promise<Player> {
  return await playerService.getPlayerById(playerId);
}
