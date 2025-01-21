"use server";

import { appRoutes } from "@/constants/appRoutes";
import { playerService } from "@/domain";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line
export async function createPlayer(playerData: any): Promise<any> {
  const newPlayer = await playerService.createPlayer(playerData);
  return newPlayer;
}

// eslint-disable-next-line
export async function updatePlayer(data: any) {
  if (!data.id) {
    throw new Error("Player ID is required for updating");
  }
  const result = await playerService.updatePlayer(data.id, data);
  revalidatePath("/admin/jugadores");
  return result;
}

export async function deletePlayer(playerId: string): Promise<void> {
  await playerService.deletePlayer(playerId);
  revalidatePath(appRoutes.players.index);
}

// eslint-disable-next-line
export async function getAllPlayers(): Promise<any> {
  return await playerService.getAllPlayers();
}

// eslint-disable-next-line
export async function getPlayerById(playerId: string): Promise<any> {
  return await playerService.getPlayerById(playerId);
}
