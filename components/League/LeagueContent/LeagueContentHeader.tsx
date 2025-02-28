'use client'

import { LeagueStatus } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'

import { startLeague } from '@/app/actions/leagueActions'
import Button from '@/components/UI/Button/Button'
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge'
import { leagueStatusMap } from '@/constants/leagueEnums'
import { SnackbarSeverity } from '@/hooks/useSnackBar'
import { formatDate } from '@/lib/helpers'
import { League, LeaguePlayer } from '@/types/league'

interface LeagueContentHeaderProps {
  league: League
  showSnackbar: (message: string, severity: SnackbarSeverity) => void
  onLeagueUpdate: () => void
}

export default function LeagueContentHeader({
  league,
  showSnackbar,
  onLeagueUpdate,
}: LeagueContentHeaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleStartLeague() {
    setIsLoading(true)
    try {
      await startLeague(league.id)
      showSnackbar('¡Liga iniciada con éxito!', SnackbarSeverity.SUCCESS)
      onLeagueUpdate()
    } catch {
      showSnackbar(
        'Ocurrió un error al iniciar la liga.',
        SnackbarSeverity.ERROR
      )
    } finally {
      setIsLoading(false)
    }
  }

  const activePlayers = league.players.filter(
    (player: LeaguePlayer) => player.player.status !== 'Deleted'
  )
  const canStartLeague =
    activePlayers.length >= 4 && activePlayers.length % 2 === 0

  return (
    <div className="mb-4 block items-center justify-between border-b border-gray-200 pb-4 md:flex">
      <div className="mb-4 flex items-center gap-2 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-800">{league.name}</h1>
        <StatusBadge status={league.status} statusMap={leagueStatusMap} />
        {league.status === LeagueStatus.InProgress && (
          <Link
            href={`/ligas/${league.id}`}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707" />
            </svg>
          </Link>
        )}
      </div>
      {league.startDate && (
        <div className="text-sm font-semibold text-gray-500">
          {formatDate(league.startDate)}
        </div>
      )}
      {league.status === LeagueStatus.Upcoming && canStartLeague && (
        <div className="text-right">
          <Button
            onClick={handleStartLeague}
            disabled={isLoading || !canStartLeague}
            label={isLoading ? 'Iniciando...' : 'Iniciar Liga'}
          />
        </div>
      )}
      {!canStartLeague && (
        <div className="font-bold text-red-500">
          La liga solo puede iniciarse con al menos 4 jugadores activos y un
          número par de jugadores
        </div>
      )}
    </div>
  )
}
