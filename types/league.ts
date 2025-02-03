import {
  League as PrismaLeague,
  LeaguePlayer as PrismaLeaguePlayer,
  LeagueRound as PrismaLeagueRound,
  LeagueRoundCouple as PrismaLeagueRoundCouple,
  Tournament as PrismaTournament,
  TournamentCouple as PrismaTournamentCouple,
  TournamentRound as PrismaTournamentRound,
  TournamentMatch as PrismaTournamentMatch,
  Player as PrismaPlayer,
} from "@prisma/client";

// Extend the LeaguePlayer type to include the full player object.
export interface LeaguePlayer extends PrismaLeaguePlayer {
  player: PrismaPlayer;
}

// Extend the LeagueRoundCouple type to include the full player objects.
export interface LeagueRoundCouple extends PrismaLeagueRoundCouple {
  player1: PrismaPlayer;
  player2: PrismaPlayer;
}

// Extend the TournamentCouple type to include the full player objects.
export interface ExtendedTournamentCouple extends PrismaTournamentCouple {
  player1: PrismaPlayer;
  player2: PrismaPlayer;
}

// Extend the TournamentMatch type so that the related couples are fully populated.
export interface TournamentMatchWithCouples extends PrismaTournamentMatch {
  couple1: ExtendedTournamentCouple;
  couple2: ExtendedTournamentCouple;
}

// Extend the TournamentRound type to include matches.
export interface ExtendedTournamentRound extends PrismaTournamentRound {
  matches: TournamentMatchWithCouples[];
}

// Extend the Tournament type to include winner couples and rounds.
export interface ExtendedTournament extends PrismaTournament {
  winnerCouples: ExtendedTournamentCouple[];
  rounds: ExtendedTournamentRound[];
}

// Extend LeagueRound to use the extended tournament type.
export interface LeagueRound extends PrismaLeagueRound {
  couples: LeagueRoundCouple[];
  tournament: ExtendedTournament | null;
}

// Extend League to include players and rounds.
export interface League extends Omit<PrismaLeague, "players"> {
  players: LeaguePlayer[];
  rounds: LeagueRound[];
}

export interface CreateLeagueData {
  name: string;
}
