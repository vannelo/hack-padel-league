'use server';

import { revalidatePath } from 'next/cache';

import { APP_ROUTES } from '@/constants/appRoutes';
import { tournamentService } from '@/domain';
import { CreateTournamentData, TournamentCoupleData } from '@/types/tournament';

export async function createTournament(tournamentData: CreateTournamentData) {
  await tournamentService.createTournament(tournamentData);
}

export async function addCoupleToTournament(
  tournamentId: string,
  coupleData: TournamentCoupleData
) {
  return tournamentService.addCoupleToTournament(tournamentId, coupleData);
}

export async function startTournament(tournamentId: string) {
  return tournamentService.startTournament(tournamentId);
}

export async function getAllTournaments() {
  return tournamentService.getAllTournaments();
}

export async function getTournamentById(id: string) {
  return tournamentService.getTournamentById(id);
}

export async function updateMatchScore(data: {
  tournamentId: string;
  matchId: string;
  couple1Score: number;
  couple2Score: number;
}) {
  await tournamentService.updateMatchScore(data);
  revalidatePath(APP_ROUTES.user.tournaments.tournament(data.tournamentId));
}

export async function finishTournament(tournamentId: string) {
  return tournamentService.finishTournament(tournamentId);
}
