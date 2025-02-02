"use client";

import {
  startTournament,
  finishTournament,
} from "@/app/actions/tournamentActions";
import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import type { Tournament } from "@/types/tournament";
import { TournamentStatus } from "@prisma/client";

interface TournamentDetailsHeaderButtonProps {
  tournament: Tournament;
  showSnackbar: (message: string, severity: "success" | "error") => void;
  onTournamentUpdate: (updatedTournament: Tournament) => void;
}

export default function TournamentDetailsHeaderButton({
  tournament,
  showSnackbar,
  onTournamentUpdate,
}: TournamentDetailsHeaderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleStartTournament() {
    setIsLoading(true);
    try {
      const updatedTournament = await startTournament(tournament.id);
      showSnackbar("¡Torneo iniciado con éxito!", "success");
      onTournamentUpdate(updatedTournament as Tournament);
    } catch {
      showSnackbar("Ocurrió un error al iniciar el torneo.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFinishTournament() {
    setIsLoading(true);
    try {
      const updatedTournament = await finishTournament(tournament.id);
      showSnackbar("¡Torneo finalizado con éxito!", "success");
      onTournamentUpdate(updatedTournament as Tournament);
    } catch {
      showSnackbar("Ocurrió un error al finalizar el torneo.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Torneo: {tournament.name}</Typography>
        {tournament.status === TournamentStatus.Upcoming && (
          <Button
            onClick={handleStartTournament}
            disabled={isLoading}
            variant="contained"
            color="primary"
          >
            Iniciar Torneo
          </Button>
        )}
        {tournament.status === TournamentStatus.InProgress && (
          <Button
            onClick={handleFinishTournament}
            disabled={isLoading}
            variant="contained"
            color="secondary"
          >
            Finalizar Torneo
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
