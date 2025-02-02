"use client";

import { Box, Typography } from "@mui/material";
import type { Tournament, TournamentCouple } from "@/types/tournament";

interface TournamentContentWinnersProps {
  tournament: Tournament;
}

export default function TournamentContentWinners({
  tournament,
}: TournamentContentWinnersProps) {
  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Ganadores
      </Typography>
      {tournament.winnerCouples.length > 0 ? (
        <ul>
          {tournament.winnerCouples.map((couple: TournamentCouple) => (
            <li key={couple.id}>
              <Typography>
                {couple.player1.name} y {couple.player2.name}
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography color="text.secondary">
          Aún no se han declarado ganadores.
        </Typography>
      )}
    </Box>
  );
}
