'use client'

import { TextField } from '@mui/material'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'

import { updatePlayerScore } from '@/app/actions/leagueActions'
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button'
import { SnackbarSeverity } from '@/hooks/useSnackBar'
import { League, LeaguePlayer } from '@/types/league'
import { Player } from '@/types/player'

import LeaguePlayerAssignmentModal from '../LeaguePlayerAssignmentModal/LeaguePlayerAssignmentModal'

interface LeagueContentRankingProps {
  league: League
  players: Player[]
  showSnackbar: (message: string, severity: SnackbarSeverity) => void
  onLeagueUpdate: () => void
}

export default function LeagueContentRanking({
  league,
  players,
  showSnackbar,
  onLeagueUpdate,
}: LeagueContentRankingProps) {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false)
  const [scoreEdits, setScoreEdits] = useState<{ [key: string]: number }>({})
  const [editingPlayers, setEditingPlayers] = useState<{
    [key: string]: boolean
  }>({})
  const [loadingPlayers, setLoadingPlayers] = useState<{
    [key: string]: boolean
  }>({})
  const sortedPlayers = league.players.sort((a, b) => b.points - a.points)

  const handleScoreChange = (playerId: string, value: string) => {
    const score = value === '' ? 0 : Math.max(0, Number.parseInt(value, 10))
    setScoreEdits((prev) => ({ ...prev, [playerId]: score }))
  }

  const handleEditClick = (playerId: string, currentScore: number) => {
    setEditingPlayers((prev) => ({ ...prev, [playerId]: true }))
    setScoreEdits((prev) => ({ ...prev, [playerId]: currentScore }))
  }

  const handleCancelEdit = (playerId: string) => {
    setEditingPlayers((prev) => ({ ...prev, [playerId]: false }))
  }

  const handleSaveScore = async (playerId: string) => {
    setLoadingPlayers((prev) => ({ ...prev, [playerId]: true }))

    try {
      await updatePlayerScore(playerId, scoreEdits[playerId])
      showSnackbar(
        'Puntuación actualizada correctamente',
        SnackbarSeverity.SUCCESS
      )
      onLeagueUpdate()
      setEditingPlayers((prev) => ({ ...prev, [playerId]: false }))
    } catch {
      showSnackbar('Error al actualizar la puntuación', SnackbarSeverity.ERROR)
    } finally {
      setLoadingPlayers((prev) => ({ ...prev, [playerId]: false }))
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-2 border-b border-gray-200 text-xl font-bold text-gray-800">
        RANKING
      </h4>
      <div className="mb-4 flex justify-between">
        <h4 className="m-0 text-sm font-bold text-gray-800">Jugador</h4>
        <h4 className="m-0 text-sm font-bold text-gray-800">Puntos</h4>
      </div>

      {sortedPlayers.length > 0 ? (
        <ul>
          {sortedPlayers.map((player: LeaguePlayer, idx: number) => (
            <li
              key={player.id}
              className="mb-2 flex items-center justify-between"
            >
              <p>
                {idx + 1} - {player.player.name}
              </p>
              <div className="flex items-center gap-2">
                {editingPlayers[player.id] ? (
                  <>
                    <TextField
                      type="number"
                      value={scoreEdits[player.id] ?? player.points}
                      onChange={(e) =>
                        handleScoreChange(player.id, e.target.value)
                      }
                      disabled={loadingPlayers[player.id]}
                      size="small"
                      sx={{ width: 60 }}
                    />
                    <Button
                      onClick={() => handleSaveScore(player.id)}
                      disabled={loadingPlayers[player.id]}
                      variant={ButtonVariant.PRIMARY}
                      size={ButtonSize.SMALL}
                      label={
                        loadingPlayers[player.id] ? 'Guardando...' : 'Guardar'
                      }
                    />
                    <button onClick={() => handleCancelEdit(player.id)}>
                      <X size={20} color="red" />
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold">{player.points}</p>
                    <button
                      onClick={() => handleEditClick(player.id, player.points)}
                    >
                      <Pencil size={16} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          No hay jugadores asignados a esta liga.
        </p>
      )}

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
    </div>
  )
}
