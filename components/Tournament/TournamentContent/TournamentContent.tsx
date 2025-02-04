"use client";

import { useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { notFound } from "next/navigation";
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
  const { tournament, isLoading, fetchTournament } =
    useTournament(initialTournament);

  const handleTournamentUpdate = useCallback(() => {
    fetchTournament();
  }, [fetchTournament]);

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
