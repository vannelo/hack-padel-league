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
  LeagueRoundCouple,
  ExtendedTournamentRound,
  TournamentMatchWithCouples,
} from "@/types/league";

interface LeagueContentRoundsProps {
  rounds: LeagueRound[];
}

export default function LeagueContentRounds({
  rounds,
}: LeagueContentRoundsProps) {
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
            {round.couples && round.couples.length > 0 ? (
              <List dense>
                {round.couples.map((couple: LeagueRoundCouple) => (
                  <ListItem key={couple.id}>
                    <ListItemText
                      primary={`${couple.player1.name} & ${couple.player2.name}`}
                      secondary={
                        couple.player1.status === "Deleted" ||
                        couple.player2.status === "Deleted"
                          ? " (Jugador inactivo)"
                          : ""
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No hay parejas asignadas.
              </Typography>
            )}
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
                  <strong>Estado:</strong> {round.tournament.status}
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
                {round.tournament &&
                round.tournament.winnerCouples &&
                round.tournament.winnerCouples.length > 0 ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Ganador:</strong>{" "}
                    {round.tournament?.winnerCouples.map((couple, index) => (
                      <span key={couple.id}>
                        {couple.player1.name} & {couple.player2.name}
                        {index <
                        (round.tournament?.winnerCouples.length ?? 0) - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
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
                              Ronda {tRound.number} - Estado: {tRound.status}
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
