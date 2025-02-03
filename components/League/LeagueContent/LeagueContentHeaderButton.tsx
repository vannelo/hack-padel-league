"use client";

import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { LeagueStatus } from "@prisma/client";
import { League, LeaguePlayer } from "@/types/league";
import { startLeague } from "@/app/actions/leagueActions";

interface LeagueContentHeaderButtonProps {
  league: League;
  showSnackbar: (message: string, severity: "success" | "error") => void;
  onLeagueUpdate: () => void;
}

export default function LeagueContentHeaderButton({
  league,
  showSnackbar,
  onLeagueUpdate,
}: LeagueContentHeaderButtonProps) {
  const [isStarting, setIsStarting] = useState(false);

  async function handleStartLeague() {
    setIsStarting(true);
    try {
      await startLeague(league.id);
      showSnackbar("¡Liga iniciada con éxito!", "success");
      onLeagueUpdate();
    } catch {
      showSnackbar("Ocurrió un error al iniciar la liga.", "error");
    } finally {
      setIsStarting(false);
    }
  }

  const activePlayers = league.players.filter(
    (player: LeaguePlayer) => player.player.status !== "Deleted"
  );
  const canStartLeague =
    activePlayers.length >= 4 && activePlayers.length % 2 === 0;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Liga: {league.name}</Typography>
        {league.status === LeagueStatus.Upcoming && (
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleStartLeague}
              disabled={isStarting || !canStartLeague}
            >
              {isStarting ? "Iniciando..." : "Iniciar Liga"}
            </Button>
            {!canStartLeague && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                La liga solo puede iniciarse con al menos 4 jugadores activos y
                un número par de jugadores.
              </Typography>
            )}
          </Box>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
