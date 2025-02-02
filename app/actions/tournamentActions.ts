"use server";

import { TournamentService } from "@/domain/services/TournamentService";
import {
  CreateTournamentData,
  Tournament,
  TournamentCoupleData,
} from "@/types/tournament";

const tournamentService = new TournamentService();

export async function createTournament(
  tournamentData: CreateTournamentData
): Promise<Tournament> {
  const tournament = await tournamentService.createTournament(tournamentData);
  return tournament as Tournament;
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
  matchId: string;
  couple1Score: number;
  couple2Score: number;
}) {
  return tournamentService.updateMatchScore(data);
}

export async function finishTournament(tournamentId: string) {
  return tournamentService.finishTournament(tournamentId);
}
