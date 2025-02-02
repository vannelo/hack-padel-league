import { TournamentStatus } from "@prisma/client";

export const tournamentStatusMap = {
  [TournamentStatus.Upcoming]: "Por Iniciar",
  [TournamentStatus.InProgress]: "Activo",
  [TournamentStatus.Completed]: "Finalizado",
};
