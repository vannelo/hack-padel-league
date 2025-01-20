"use server";

import { leagueService } from "@/domain";
import { APP_ROUTES } from "@/utils/constants";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line
export async function createLeague(data: any) {
  await leagueService.createLeague(data);
  revalidatePath(APP_ROUTES.leagues.index);
}

export async function deleteLeague(id: string) {
  await leagueService.deleteLeague(id);
  revalidatePath(APP_ROUTES.leagues.index);
}

// eslint-disable-next-line
export async function addPlayerToLeague(data: any) {
  await leagueService.addPlayerToLeague(data);
  revalidatePath(APP_ROUTES.leagues.index);
}

export async function getAllLeagues() {
  return leagueService.getAllLeagues();
}

export async function getLeagueById(id: string) {
  return leagueService.getLeagueById(id);
}

export async function startLeague(leagueId: string) {
  return leagueService.startLeague(leagueId);
}
