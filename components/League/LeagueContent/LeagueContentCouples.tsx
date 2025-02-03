"use client";

import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { Player } from "@/types/player";
import { LeagueStatus } from "@prisma/client";
import { League, LeaguePlayer } from "@/types/league";
import LeaguePlayerAssignmentModal from "../LeaguePlayerAssignmentModal/LeaguePlayerAssignmentModal";

interface LeagueContentCouplesProps {
  league: League;
  players: Player[];
  showSnackbar: (message: string, severity: "success" | "error") => void;
  onLeagueUpdate: () => void;
}

export default function LeagueContentCouples({
  league,
  players,
  showSnackbar,
  onLeagueUpdate,
}: LeagueContentCouplesProps) {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Parejas
      </Typography>
      <>
        {league.status === LeagueStatus.Upcoming && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddingPlayer(true)}
            >
              Agregar pareja
            </Button>
          </Box>
        )}
        {league.players.length > 0 ? (
          <Box>
            {league.players.map((player: LeaguePlayer) => (
              <Box key={player.id}>
                <Typography>
                  {player.player.name} - Puntos:{" "}
                  <strong>{player.points}</strong>
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box mt={4}>
            <Typography color="text.secondary">
              No hay jugadores asignados a esta liga.
            </Typography>
          </Box>
        )}
      </>
      {isAddingPlayer && (
        <LeaguePlayerAssignmentModal
          league={league}
          players={players}
          open={isAddingPlayer}
          onClose={() => setIsAddingPlayer(false)}
          showSnackbar={showSnackbar}
          onLeagueUpdate={onLeagueUpdate}
        />
      )}
    </Box>
  );
}
