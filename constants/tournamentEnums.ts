import { TournamentStatus, TournamentType } from "@prisma/client";

export const tournamentStatusMap = {
  [TournamentStatus.Upcoming]: "Por Iniciar",
  [TournamentStatus.InProgress]: "Activo",
  [TournamentStatus.Completed]: "Finalizado",
};

export const tournamentTypeMap = {
  [TournamentType.League]: "Liga",
  [TournamentType.Casual]: "Casual",
};
