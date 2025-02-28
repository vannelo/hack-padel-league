import {
  League as PrismaLeague,
  LeaguePlayer as PrismaLeaguePlayer,
  LeagueRound as PrismaLeagueRound,
  LeagueRoundCouple as PrismaLeagueRoundCouple,
  Player as PrismaPlayer,
  Tournament as PrismaTournament,
  TournamentCouple as PrismaTournamentCouple,
  TournamentMatch as PrismaTournamentMatch,
  TournamentRound as PrismaTournamentRound,
} from '@prisma/client'

export interface LeaguePlayer extends PrismaLeaguePlayer {
  player: PrismaPlayer
}

export interface LeagueRoundCouple extends PrismaLeagueRoundCouple {
  player1: PrismaPlayer
  player2: PrismaPlayer
}

export interface ExtendedTournamentCouple extends PrismaTournamentCouple {
  player1: PrismaPlayer
  player2: PrismaPlayer
}

export interface TournamentMatchWithCouples extends PrismaTournamentMatch {
  couple1: ExtendedTournamentCouple
  couple2: ExtendedTournamentCouple
}

export interface ExtendedTournamentRound extends PrismaTournamentRound {
  matches: TournamentMatchWithCouples[]
}

export interface ExtendedTournament extends PrismaTournament {
  winnerCouples: ExtendedTournamentCouple[]
  rounds: ExtendedTournamentRound[]
}

export interface LeagueRound extends PrismaLeagueRound {
  couples: LeagueRoundCouple[]
  tournament: ExtendedTournament | null
}

export interface League extends Omit<PrismaLeague, 'players'> {
  players: LeaguePlayer[]
  rounds: LeagueRound[]
}

export interface CreateLeagueData {
  name: string
}

export interface AddPlayerToLeagueData {
  leagueId: string
  playerId: string
}
