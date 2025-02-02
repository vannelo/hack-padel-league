"use client";

import { useEffect, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { notFound } from "next/navigation";
import { TournamentStatus } from "@prisma/client";
import type { Tournament } from "@/types/tournament";
import type { Player } from "@/types/player";
import { useSnackbar } from "@/hooks/useSnackBar";

import TournamentContentHeaderButton from "./TournamentContentHeaderButton";
import TournamentContentDetails from "./TournamentContentDetails";
import TournamentContentCouples from "./TournamentContentCouples";
import TournamentContentWinners from "./TournamentContentWinners";
import TournamentContentRounds from "./TournamentContentRounds";
import { useTournament } from "@/hooks/useTournament";

interface TournamentContentProps {
  initialTournament: Tournament;
  players: Player[];
}

export default function TournamentContent({
  initialTournament,
  players,
}: TournamentContentProps) {
  const { showSnackbar } = useSnackbar();
  const {
    tournament,
    isLoading,
    fetchTournament,
    finishTournament,
    areAllMatchesPlayed,
  } = useTournament(initialTournament);

  const handleTournamentUpdate = useCallback(() => {
    fetchTournament();
  }, [fetchTournament]);

  const handleFinishTournament = useCallback(async () => {
    try {
      await finishTournament();
      showSnackbar("¡Torneo finalizado con éxito!", "success");
    } catch (error) {
      console.error("Error finishing tournament:", error);
      showSnackbar("Ocurrió un error al finalizar el torneo.", "error");
    }
  }, [finishTournament, showSnackbar]);

  useEffect(() => {
    if (
      areAllMatchesPlayed &&
      tournament?.status !== TournamentStatus.InProgress
    ) {
      handleFinishTournament();
    }
  }, [areAllMatchesPlayed, tournament?.status, handleFinishTournament]);

  if (!tournament) {
    notFound();
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
      }}
    >
      <TournamentContentHeaderButton
        tournament={tournament}
        showSnackbar={showSnackbar}
        onTournamentUpdate={handleTournamentUpdate}
      />
      <TournamentContentDetails tournament={tournament} />
      <TournamentContentCouples
        tournament={tournament}
        players={players}
        showSnackbar={showSnackbar}
        onTournamentUpdate={handleTournamentUpdate}
      />
      <TournamentContentWinners tournament={tournament} />
      <TournamentContentRounds
        tournament={tournament}
        showSnackbar={showSnackbar}
        onTournamentUpdate={handleTournamentUpdate}
      />
    </Box>
  );
}
