'use server';

import { revalidatePath } from 'next/cache';

import { tournamentService } from '@/domain';
import { pusher } from '@/lib/pusher';
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
  revalidatePath(`/torneos/${data.tournamentId}`);

  try {
    await pusher.trigger(`tournament-${data.tournamentId}`, 'score-updated', {
      matchId: data.matchId,
      timestamp: new Date().toISOString(),
    });
    console.log('Pusher event triggered for tournament update');
  } catch (error) {
    console.error('Failed to trigger Pusher event:', error);
  }
}

export async function finishTournament(tournamentId: string) {
  return tournamentService.finishTournament(tournamentId);
}
