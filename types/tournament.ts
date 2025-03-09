import type {
  Player as PrismaPlayer,
  Tournament as PrismaTournament,
  TournamentCouple as PrismaTournamentCouple,
  TournamentMatch as PrismaTournamentMatch,
  TournamentRound as PrismaTournamentRound,
  TournamentStatus as PrismaTournamentStatus,
} from '@prisma/client';

export interface TournamentCouple extends PrismaTournamentCouple {
  player1: PrismaPlayer;
  player2: PrismaPlayer;
}

export interface TournamentMatch extends PrismaTournamentMatch {
  couple1: TournamentCouple;
  couple2: TournamentCouple;
}

export interface TournamentRound extends PrismaTournamentRound {
  matches: TournamentMatch[];
}

export interface Tournament extends Omit<PrismaTournament, 'couples'> {
  couples: TournamentCouple[];
  winnerCouples: TournamentCouple[];
  rounds: TournamentRound[];
}

export interface CreateTournamentData {
  name: string;
  availableCourts: number;
}

export interface TournamentCoupleData {
  player1Id: string;
  player2Id: string;
}

export type TournamentStatus = PrismaTournamentStatus;
