'use client'

import { TextField } from '@mui/material'
import { TournamentMatchStatus, TournamentStatus } from '@prisma/client'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'

import { updateMatchScore } from '@/app/actions/tournamentActions'
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button'
import { SnackbarSeverity } from '@/hooks/useSnackBar'
import type {
  Tournament,
  TournamentMatch,
  TournamentRound,
} from '@/types/tournament'

interface TournamentContentRoundsProps {
  tournament: Tournament
  showSnackbar: (message: string, severity: SnackbarSeverity) => void
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
  const [editingMatches, setEditingMatches] = useState<Record<string, boolean>>(
    {}
  )
  const [loadingMatches, setLoadingMatches] = useState<Record<string, boolean>>(
    {}
  )

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
    setLoadingMatches((prev) => ({ ...prev, [matchId]: true }))

    const matchScores = scores[matchId]
    if (
      matchScores?.couple1Score !== null &&
      matchScores?.couple2Score !== null
    ) {
      try {
        await updateMatchScore({
          matchId,
          couple1Score: matchScores.couple1Score,
          couple2Score: matchScores.couple2Score,
        })
        showSnackbar(
          'Resultado actualizado correctamente',
          SnackbarSeverity.SUCCESS
        )
        onTournamentUpdate()
        setEditingMatches((prev) => ({ ...prev, [matchId]: false }))
      } catch {
        showSnackbar('Error al actualizar el resultado', SnackbarSeverity.ERROR)
      } finally {
        setLoadingMatches((prev) => ({ ...prev, [matchId]: false }))
      }
    } else {
      showSnackbar(
        'Ingrese puntuaciones válidas para ambas parejas',
        SnackbarSeverity.ERROR
      )
      setLoadingMatches((prev) => ({ ...prev, [matchId]: false }))
    }
  }

  const handleEditClick = (matchId: string) => {
    setEditingMatches((prev) => ({ ...prev, [matchId]: true }))
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        couple1Score:
          tournament.rounds
            .flatMap((round) => round.matches)
            .find((m) => m.id === matchId)?.couple1Score ?? 0,
        couple2Score:
          tournament.rounds
            .flatMap((round) => round.matches)
            .find((m) => m.id === matchId)?.couple2Score ?? 0,
      },
    }))
  }

  const handleCancelEdit = (matchId: string) => {
    setEditingMatches((prev) => ({ ...prev, [matchId]: false }))
  }

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-4 border-b border-gray-200 text-xl font-bold text-gray-800">
        PARTIDOS
      </h4>
      {tournament.rounds.length > 0 ? (
        tournament.rounds.map((round: TournamentRound) => (
          <div
            className="mb-4 border-b border-gray-200 pb-4 text-center last:border-b-0 last:pb-0"
            key={round.id}
          >
            <h4 className="text-md m-0 mb-4 font-bold">Ronda {round.number}</h4>
            {round.matches.map((match: TournamentMatch) => {
              const isCompleted =
                match.status === TournamentMatchStatus.Completed
              const isEditable = !isCompleted

              return (
                <div key={match.id} className="mb-8 md:mb-4">
                  <div className="mb-2 block items-center text-center md:flex">
                    <div className="mb-2 flex-1 text-right md:mb-0">
                      {match.couple1.player1.name} /{' '}
                      {match.couple1.player2.name}
                    </div>
                    <div className="mx-4 mb-2 inline-block md:mb-0 md:block">
                      {editingMatches[match.id] || isEditable ? (
                        <div className="flex items-center justify-center gap-2">
                          <TextField
                            type="number"
                            value={
                              scores[match.id]?.couple1Score ??
                              match.couple1Score ??
                              ''
                            }
                            onChange={(e) =>
                              handleScoreChange(match.id, 1, e.target.value)
                            }
                            disabled={loadingMatches[match.id]}
                            inputProps={{ min: 0, max: 20 }}
                            size="small"
                            sx={{ width: 60 }}
                          />
                          <span>-</span>
                          <TextField
                            type="number"
                            value={
                              scores[match.id]?.couple2Score ??
                              match.couple2Score ??
                              ''
                            }
                            onChange={(e) =>
                              handleScoreChange(match.id, 2, e.target.value)
                            }
                            disabled={loadingMatches[match.id]}
                            inputProps={{ min: 0, max: 20 }}
                            size="small"
                            sx={{ width: 60 }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-xl font-bold">
                            {match.couple1Score ?? 0} -{' '}
                            {match.couple2Score ?? 0}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      {match.couple2.player1.name} /{' '}
                      {match.couple2.player2.name}
                    </div>
                  </div>
                  {!isEditable && !editingMatches[match.id] && (
                    <div className="mb-8 text-center">
                      <button onClick={() => handleEditClick(match.id)}>
                        <Pencil size={16} />
                      </button>
                    </div>
                  )}
                  {editingMatches[match.id] && (
                    <div className="mb-8 flex items-center justify-center gap-2">
                      <Button
                        onClick={() => handleUpdateScore(match.id)}
                        disabled={loadingMatches[match.id]}
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.SMALL}
                        label={
                          loadingMatches[match.id]
                            ? 'Actualizando...'
                            : 'Actualizar resultado'
                        }
                      />
                      <button onClick={() => handleCancelEdit(match.id)}>
                        <X size={20} color="red" />
                      </button>
                    </div>
                  )}
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
                          variant={ButtonVariant.PRIMARY}
                          size={ButtonSize.SMALL}
                          label={
                            loadingMatches[match.id]
                              ? 'Guardando...'
                              : 'Guardar resultado'
                          }
                        />
                      </div>
                    )}
                </div>
              )
            })}
          </div>
        ))
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          No hay rondas creadas para este torneo.
        </p>
      )}
    </div>
  )
}
