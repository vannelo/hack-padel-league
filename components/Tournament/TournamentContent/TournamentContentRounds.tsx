"use client";

import { useState } from "react";
import { TournamentMatchStatus } from "@prisma/client";
import { updateMatchScore } from "@/app/actions/tournamentActions";
import {
  Typography,
  TextField,
  Box,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import type {
  Tournament,
  TournamentMatch,
  TournamentRound,
} from "@/types/tournament";

interface TournamentContentRoundsProps {
  tournament: Tournament;
  showSnackbar: (message: string, severity: "success" | "error") => void;
  onTournamentUpdate: () => void;
}

export default function TournamentContentRounds({
  tournament,
  showSnackbar,
  onTournamentUpdate,
}: TournamentContentRoundsProps) {
  const [scores, setScores] = useState<
    Record<string, { couple1Score: number | null; couple2Score: number | null }>
  >({});
  const [loadingMatches, setLoadingMatches] = useState<Record<string, boolean>>(
    {}
  );

  const handleScoreChange = (
    matchId: string,
    coupleNumber: 1 | 2,
    value: string
  ) => {
    const score =
      value === ""
        ? null
        : Math.min(Math.max(0, Number.parseInt(value, 10)), 20);
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [`couple${coupleNumber}Score`]: score,
      },
    }));
  };

  const handleUpdateScore = async (matchId: string) => {
    const matchScores = scores[matchId];
    if (
      matchScores &&
      matchScores.couple1Score !== null &&
      matchScores.couple2Score !== null
    ) {
      setLoadingMatches((prev) => ({ ...prev, [matchId]: true }));
      try {
        await updateMatchScore({
          matchId,
          couple1Score: matchScores.couple1Score,
          couple2Score: matchScores.couple2Score,
        });
        showSnackbar("Resultado añadido correctamente", "success");
        onTournamentUpdate();
      } catch {
        showSnackbar("Error al añadir el resultado", "error");
      } finally {
        setLoadingMatches((prev) => ({ ...prev, [matchId]: false }));
      }
    } else {
      showSnackbar(
        "Por favor, ingrese puntuaciones válidas para ambas parejas",
        "error"
      );
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Rondas
      </Typography>
      {tournament.rounds.length > 0 ? (
        <Box>
          {tournament.rounds.map((round: TournamentRound) => (
            <Paper key={round.id} elevation={2} sx={{ mb: 3, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ronda {round.number}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" flexDirection="column" gap={3}>
                {round.matches.map((match: TournamentMatch) => (
                  <Box
                    key={match.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body1">
                        {match.couple1.player1.name} y{" "}
                        {match.couple1.player2.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        vs
                      </Typography>
                      <Typography variant="body1">
                        {match.couple2.player1.name} y{" "}
                        {match.couple2.player2.name}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      {match.status === TournamentMatchStatus.Completed ? (
                        <Typography variant="body1">
                          {match.couple1Score} - {match.couple2Score}
                        </Typography>
                      ) : (
                        <>
                          <TextField
                            type="number"
                            placeholder={match.couple1Score?.toString() ?? "0"}
                            value={scores[match.id]?.couple1Score ?? ""}
                            onChange={(e) =>
                              handleScoreChange(match.id, 1, e.target.value)
                            }
                            disabled={loadingMatches[match.id]}
                            inputProps={{
                              min: 0,
                              max: 20,
                            }}
                            size="small"
                            sx={{ width: 60 }}
                          />
                          <Typography variant="body1">-</Typography>
                          <TextField
                            type="number"
                            placeholder={match.couple2Score?.toString() ?? "0"}
                            value={scores[match.id]?.couple2Score ?? ""}
                            onChange={(e) =>
                              handleScoreChange(match.id, 2, e.target.value)
                            }
                            disabled={loadingMatches[match.id]}
                            inputProps={{
                              min: 0,
                              max: 20,
                            }}
                            size="small"
                            sx={{ width: 60 }}
                          />
                          <Button
                            onClick={() => handleUpdateScore(match.id)}
                            disabled={
                              loadingMatches[match.id] ||
                              scores[match.id]?.couple1Score === null ||
                              scores[match.id]?.couple2Score === null
                            }
                            variant="contained"
                            color="primary"
                          >
                            Guardar
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">
          Aún no se han creado rondas.
        </Typography>
      )}
    </Box>
  );
}
