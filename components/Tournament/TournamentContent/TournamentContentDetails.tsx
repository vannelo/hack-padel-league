"use client";

import { Typography, Chip, Box } from "@mui/material";
import type { Tournament } from "@/types/tournament";
import { TournamentStatus } from "@prisma/client";
import { tournamentStatusMap } from "@/constants/tournamentEnums";

interface TournamentContentDetailsProps {
  tournament: Tournament;
}

export default function TournamentContentDetails({
  tournament,
}: TournamentContentDetailsProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalles
      </Typography>
      <Box>
        <strong>Estado:</strong>{" "}
        <Chip
          label={tournamentStatusMap[tournament.status]}
          color={
            tournament.status === TournamentStatus.Upcoming
              ? "primary"
              : tournament.status === TournamentStatus.InProgress
              ? "secondary"
              : "default"
          }
        />
      </Box>
      {tournament.startDate && (
        <Box>
          <Typography>
            <strong>Fecha:</strong>{" "}
            {new Date(tournament.startDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
      <Box>
        <Typography>
          <strong>Canchas Disponibles:</strong> {tournament.availableCourts}
        </Typography>
      </Box>
    </Box>
  );
}
