import { LeagueStatus } from "@prisma/client";

export const leagueStatusMap = {
  [LeagueStatus.Upcoming]: "Por Iniciar",
  [LeagueStatus.InProgress]: "Activa",
  [LeagueStatus.Completed]: "Finalizada",
};
