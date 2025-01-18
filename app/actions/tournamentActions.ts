"use server";

import { TournamentService } from "@/domain/services/TournamentService";

const tournamentService = new TournamentService();

// eslint-disable-next-line
export async function createTournament(data: any) {
  return tournamentService.createTournament(data);
}

export async function addCoupleToTournament(data: {
  tournamentId: string;
  player1Id: string;
  player2Id: string;
}) {
  return tournamentService.addCoupleToTournament(data);
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
  matchId: string;
  couple1Score: number;
  couple2Score: number;
}) {
  return tournamentService.updateMatchScore(data);
}

export async function finishTournament(tournamentId: string) {
  return tournamentService.finishTournament(tournamentId);
}
