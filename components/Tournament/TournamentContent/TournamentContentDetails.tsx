"use client";

import { Typography, Chip, Box, Link, Button } from "@mui/material";
import NextLink from "next/link";
import type { Tournament } from "@/types/tournament";
import { TournamentStatus, TournamentType } from "@prisma/client";
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
      {tournament.type === TournamentType.League && tournament.leagueId && (
        <Box sx={{ mt: 2 }}>
          <Typography>
            <strong>Liga Asociada:</strong>{" "}
            <Link
              component={NextLink}
              href={`/admin/ligas/${tournament.leagueId}`}
              color="primary"
              underline="hover"
            >
              Ver Liga
            </Link>
          </Typography>
        </Box>
      )}
      {tournament.status === TournamentStatus.InProgress && (
        <Button
          variant="contained"
          color="primary"
          href={`/torneos/${tournament.id}`}
          target="_blank"
        >
          Ver link público
        </Button>
      )}
    </Box>
  );
}
