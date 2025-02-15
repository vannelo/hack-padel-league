'use client'

import { useState, useMemo } from 'react'
import { Player } from '@/types/player'
import { LeagueStatus } from '@prisma/client'
import { League, LeaguePlayer } from '@/types/league'
import LeaguePlayerAssignmentModal from '../LeaguePlayerAssignmentModal/LeaguePlayerAssignmentModal'
import Button from '@/components/UI/Button/Button'

interface LeagueContentRankingProps {
  league: League
  players: Player[]
  showSnackbar: (message: string, severity: 'success' | 'error') => void
  onLeagueUpdate: () => void
}

export default function LeagueContentRanking({
  league,
  players,
  showSnackbar,
  onLeagueUpdate,
}: LeagueContentRankingProps) {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false)

  const sortedPlayers = useMemo(() => {
    return [...league.players].sort((a, b) => b.points - a.points)
  }, [league.players])

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-2 border-b border-gray-200 text-xl font-bold text-gray-800">
        RANKING
      </h4>
      {league.status === LeagueStatus.InProgress && (
        <div className="mb-4 flex justify-between">
          <h4 className="m-0 text-sm font-bold text-gray-800">Jugador</h4>
          <h4 className="m-0 text-sm font-bold text-gray-800">Puntos</h4>
        </div>
      )}
      {league.status === LeagueStatus.Upcoming && (
        <div className="mb-4 mt-4">
          <Button
            onClick={() => setIsAddingPlayer(true)}
            variant="primary"
            label="Agregar Jugador"
            size="small"
          />
        </div>
      )}
      {sortedPlayers.length > 0 ? (
        <ul>
          {sortedPlayers.map((player: LeaguePlayer, idx: number) => (
            <li key={player.id} className="flex justify-between">
              <p>
                {idx + 1} - {player.player.name}
              </p>
              <p className="font-bold">{player.points}</p>
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
