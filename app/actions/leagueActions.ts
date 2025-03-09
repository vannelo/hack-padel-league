'use server';

import { leagueService } from '@/domain';
import { AddPlayerToLeagueData, CreateLeagueData } from '@/types/league';

export async function createLeague(data: CreateLeagueData) {
  await leagueService.createLeague(data);
}

export async function deleteLeague(id: string) {
  await leagueService.deleteLeague(id);
}

export async function addPlayerToLeague(data: AddPlayerToLeagueData) {
  await leagueService.addPlayerToLeague(data);
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

export async function finishLeague(leagueId: string) {
  return leagueService.finishLeague(leagueId);
}

export async function updatePlayerScore(playerId: string, newScore: number) {
  return leagueService.updatePlayerScore(playerId, newScore);
}
