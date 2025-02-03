"use client";

import { Typography, Box, Button } from "@mui/material";
import type { Tournament, TournamentCouple } from "@/types/tournament";
import TournamentCoupleAssignmentModal from "../TournamentCoupleAssignmentModal/TournamentCoupleAssignmentModal";
import { useState } from "react";
import { Player } from "@/types/player";
import { TournamentStatus, TournamentType } from "@prisma/client";

interface TournamentContentCouplesProps {
  tournament: Tournament;
  players: Player[];
  showSnackbar: (message: string, severity: "success" | "error") => void;
  onTournamentUpdate: () => void;
}

export default function TournamentContentCouples({
  tournament,
  players,
  showSnackbar,
  onTournamentUpdate,
}: TournamentContentCouplesProps) {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Parejas
      </Typography>
      <>
        {tournament.status === TournamentStatus.Upcoming &&
          tournament.type !== TournamentType.League && (
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
        {tournament.couples.length > 0 ? (
          <Box>
            {tournament.couples.map((couple: TournamentCouple) => (
              <Box key={couple.id}>
                <Typography>
                  {couple.player1.name} y {couple.player2.name} - Puntuación:{" "}
                  <strong>{couple.score}</strong>
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box mt={4}>
            <Typography color="text.secondary">
              No hay parejas asignadas a este torneo.
            </Typography>
          </Box>
        )}
      </>
      {isAddingPlayer && (
        <TournamentCoupleAssignmentModal
          tournament={tournament}
          players={players}
          open={isAddingPlayer}
          onClose={() => setIsAddingPlayer(false)}
          showSnackbar={showSnackbar}
          onTournamentUpdate={onTournamentUpdate}
        />
      )}
    </Box>
  );
}
