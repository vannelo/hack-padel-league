"use client";

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import type {
  LeagueRound,
  ExtendedTournamentRound,
  TournamentMatchWithCouples,
} from "@/types/league";
import { TournamentStatus } from "@prisma/client";

interface LeagueContentRoundsProps {
  rounds: LeagueRound[];
}

export default function LeagueContentRounds({
  rounds,
}: LeagueContentRoundsProps) {
  console.log("rounds", rounds);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Rondas
      </Typography>
      {rounds && rounds.length > 0 ? (
        rounds.map((round: LeagueRound) => (
          <Box
            key={round.id}
            sx={{
              border: 1,
              borderColor: "grey.300",
              borderRadius: 1,
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Ronda {round.number}
            </Typography>

            {round.tournament ? (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px dashed grey",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Detalles del Torneo
                </Typography>
                <Typography variant="body2">
                  <strong>Nombre:</strong> {round.tournament.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Estado:</strong>{" "}
                  <span
                    style={{
                      color:
                        round.tournament.status === TournamentStatus.Completed
                          ? "green"
                          : round.tournament.status ===
                            TournamentStatus.InProgress
                          ? "blue"
                          : "black",
                    }}
                  >
                    {round.tournament.status}
                  </span>
                </Typography>
                {round.tournament.startDate && (
                  <Typography variant="body2">
                    <strong>Inicio:</strong>{" "}
                    {new Date(round.tournament.startDate).toLocaleDateString()}
                  </Typography>
                )}
                {round.tournament.endDate && (
                  <Typography variant="body2">
                    <strong>Fin:</strong>{" "}
                    {new Date(round.tournament.endDate).toLocaleDateString()}
                  </Typography>
                )}

                {/* Properly Checking for Tournament Completion & Winners */}
                {round.tournament.status === "Completed" &&
                round.tournament.winnerCouples &&
                round.tournament.winnerCouples.length > 0 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    🏆 <strong>Ganador:</strong>{" "}
                    {round.tournament.winnerCouples.map((couple, index) => (
                      <span key={couple.id}>
                        {couple.player1.name} & {couple.player2.name}
                        {index <
                        (round.tournament?.winnerCouples.length ?? 0) - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </Typography>
                ) : round.tournament.status === "Completed" ? (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "red",
                    }}
                  >
                    ⚠️ El torneo ha finalizado, pero no se han registrado
                    ganadores.
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    No hay pareja ganadora aún.
                  </Typography>
                )}

                {round.tournament.rounds &&
                  round.tournament.rounds.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Partidos
                      </Typography>
                      {round.tournament.rounds.map(
                        (tRound: ExtendedTournamentRound) => (
                          <Box
                            key={tRound.id}
                            sx={{
                              pl: 2,
                              borderLeft: "1px solid grey",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2">
                              Ronda {tRound.number} - Estado:{" "}
                              <strong>{tRound.status}</strong>
                            </Typography>
                            {tRound.matches && tRound.matches.length > 0 ? (
                              <List dense>
                                {tRound.matches.map(
                                  (match: TournamentMatchWithCouples) => (
                                    <ListItem key={match.id}>
                                      <ListItemText
                                        primary={`${
                                          match.couple1.player1.name
                                        } (${match.couple1Score ?? "-"}) vs ${
                                          match.couple2.player1.name
                                        } (${match.couple2Score ?? "-"})`}
                                      />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                No hay partidos.
                              </Typography>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  )}
                <Box sx={{ mt: 2 }}>
                  <Link href={`/admin/torneos/${round.tournament.id}`} passHref>
                    <Button variant="contained" color="primary">
                      Ir al Torneo de la Ronda
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No se ha creado un torneo para esta ronda.
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay rondas creadas para esta liga.
        </Typography>
      )}
    </Box>
  );
}
