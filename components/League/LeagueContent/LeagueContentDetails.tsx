"use client";

import { Typography, Chip, Box, Button } from "@mui/material";
import { LeagueStatus } from "@prisma/client";
import { League } from "@/types/league";
import { leagueStatusMap } from "@/constants/leagueEnums";

interface LeagueContentDetailsProps {
  league: League;
}

export default function LeagueContentDetails({
  league,
}: LeagueContentDetailsProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalles
      </Typography>
      <Box>
        <strong>Estado:</strong>{" "}
        <Chip
          label={leagueStatusMap[league.status]}
          color={
            league.status === LeagueStatus.Upcoming
              ? "primary"
              : league.status === LeagueStatus.InProgress
              ? "secondary"
              : "default"
          }
        />
      </Box>
      {league.startDate && (
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Fecha:</strong>{" "}
            {new Date(league.startDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
      {league.status === LeagueStatus.InProgress && (
        <Button
          variant="contained"
          color="primary"
          href={`/ligas/${league.id}`}
          target="_blank"
        >
          Ver link público
        </Button>
      )}
    </Box>
  );
}
