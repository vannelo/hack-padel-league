import { LeagueService } from '@/domain/services/LeagueService';
import { PlayerService } from '@/domain/services/PlayerService';
import { TournamentService } from '@/domain/services/TournamentService';

export const playerService = new PlayerService();
export const leagueService = new LeagueService();
export const tournamentService = new TournamentService();
