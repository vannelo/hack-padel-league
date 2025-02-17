'use client'

import { TextField } from '@mui/material'
import { TournamentMatchStatus, TournamentStatus } from '@prisma/client'
import { useState } from 'react'

import { updateMatchScore } from '@/app/actions/tournamentActions'
import Button from '@/components/UI/Button/Button'
import type {
  Tournament,
  TournamentMatch,
  TournamentRound,
} from '@/types/tournament'

interface TournamentContentRoundsProps {
  tournament: Tournament
  showSnackbar: (message: string, severity: 'success' | 'error') => void
  onTournamentUpdate: () => void
}

export default function TournamentContentRounds({
  tournament,
  showSnackbar,
  onTournamentUpdate,
}: TournamentContentRoundsProps) {
  const [scores, setScores] = useState<
    Record<string, { couple1Score: number | null; couple2Score: number | null }>
  >({})
  const [loadingMatches, setLoadingMatches] = useState<Record<string, boolean>>(
    {}
  )
  const [loading, setLoading] = useState(false)

  const handleScoreChange = (
    matchId: string,
    coupleNumber: 1 | 2,
    value: string
  ) => {
    const score =
      value === ''
        ? null
        : Math.min(Math.max(0, Number.parseInt(value, 10)), 20)
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [`couple${coupleNumber}Score`]: score,
      },
    }))
  }

  const handleUpdateScore = async (matchId: string) => {
    setLoading(true)
    const matchScores = scores[matchId]
    if (
      matchScores &&
      matchScores.couple1Score !== null &&
      matchScores.couple2Score !== null
    ) {
      setLoadingMatches((prev) => ({ ...prev, [matchId]: true }))
      try {
        await updateMatchScore({
          matchId,
          couple1Score: matchScores.couple1Score,
          couple2Score: matchScores.couple2Score,
        })
        showSnackbar('Resultado añadido correctamente', 'success')
        onTournamentUpdate()
        setLoading(false)
      } catch {
        showSnackbar('Error al añadir el resultado', 'error')
        setLoading(false)
      } finally {
        setLoadingMatches((prev) => ({ ...prev, [matchId]: false }))
        setLoading(false)
      }
    } else {
      showSnackbar(
        'Por favor, ingrese puntuaciones válidas para ambas parejas',
        'error'
      )
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-4 border-b border-gray-200 text-xl font-bold text-gray-800">
        PARTIDOS
      </h4>
      {tournament.rounds.length > 0 ? (
        <>
          {tournament.rounds.map((round: TournamentRound) => (
            <div
              className="mb-4 border-b border-gray-200 pb-4 text-center last:border-b-0 last:pb-0"
              key={round.id}
            >
              <h4 className="text-md m-0 mb-4 font-bold">
                Ronda {round.number}
              </h4>
              {round.matches.map((match: TournamentMatch) => (
                <div key={match.id} className="mb-8 md:mb-4">
                  <div
                    className="mb-2 block items-center text-center md:flex"
                    key={match.id}
                  >
                    <div className="mb-2 flex-1 text-right md:mb-0">
                      {match.couple1.player1.name} /{' '}
                      {match.couple1.player2.name}
                    </div>
                    <div className="mx-4 mb-2 inline-block md:mb-0 md:block">
                      {match.status === TournamentMatchStatus.Completed ||
                      tournament.status === TournamentStatus.Completed ? (
                        <div>
                          <p className="text-xl font-bold">
                            {match.couple1Score ?? 0} -{' '}
                            {match.couple2Score ?? 0}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <TextField
                            type="number"
                            placeholder={match.couple1Score?.toString() ?? '0'}
                            value={scores[match.id]?.couple1Score ?? ''}
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
                          <span>-</span>
                          <TextField
                            type="number"
                            placeholder={match.couple2Score?.toString() ?? '0'}
                            value={scores[match.id]?.couple2Score ?? ''}
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
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      {match.couple2.player1.name} /{' '}
                      {match.couple2.player2.name}
                    </div>
                  </div>
                  {match.status !== TournamentMatchStatus.Completed &&
                    tournament.status === TournamentStatus.InProgress && (
                      <div className="mb-8 text-center">
                        <Button
                          onClick={() => handleUpdateScore(match.id)}
                          disabled={
                            loadingMatches[match.id] ||
                            scores[match.id]?.couple1Score === null ||
                            scores[match.id]?.couple2Score === null
                          }
                          variant="primary"
                          size="small"
                          label={loading ? 'Guardando...' : 'Guardar resultado'}
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          No hay rondas creadas para este torneo.
        </p>
      )}
    </div>
  )
}
