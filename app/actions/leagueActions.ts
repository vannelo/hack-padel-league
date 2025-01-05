"use server";

import { leagueService } from "@/domain";

// eslint-disable-next-line
export async function createLeague(data: any) {
  return leagueService.createLeague(data);
}

export async function deleteLeague(id: string) {
  return leagueService.deleteLeague(id);
}

export async function getAllLeagues() {
  return leagueService.getAllLeagues();
}

// eslint-disable-next-line
export async function addPlayerToLeague(data: any) {
  return leagueService.addPlayerToLeague(data);
}
