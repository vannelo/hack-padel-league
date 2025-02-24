'use client'

import { TournamentStatus } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'

import {
  finishTournament,
  startTournament,
} from '@/app/actions/tournamentActions'
import Button, { ButtonVariant } from '@/components/UI/Button/Button'
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge'
import { tournamentStatusMap } from '@/constants/tournamentEnums'
import { SnackbarSeverity } from '@/hooks/useSnackBar'
import { formatDate } from '@/lib/helpers'
import type { Tournament } from '@/types/tournament'

interface TournamentDetailsHeaderProps {
  tournament: Tournament
  showSnackbar: (message: string, severity: SnackbarSeverity) => void
  onTournamentUpdate: (updatedTournament: Tournament) => void
}

export default function TournamentContentHeader({
  tournament,
  showSnackbar,
  onTournamentUpdate,
}: TournamentDetailsHeaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleStartTournament() {
    setIsLoading(true)
    try {
      const updatedTournament = await startTournament(tournament.id)
      showSnackbar('¡Torneo iniciado con éxito!', SnackbarSeverity.SUCCESS)
      onTournamentUpdate(updatedTournament as Tournament)
    } catch {
      showSnackbar(
        'Ocurrió un error al iniciar el torneo.',
        SnackbarSeverity.ERROR
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFinishTournament() {
    setIsLoading(true)
    try {
      const updatedTournament = await finishTournament(tournament.id)
      showSnackbar('¡Torneo finalizado con éxito!', SnackbarSeverity.SUCCESS)
      onTournamentUpdate(updatedTournament as Tournament)
    } catch {
      showSnackbar(
        'Ocurrió un error al finalizar el torneo.',
        SnackbarSeverity.ERROR
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4 block items-center justify-between border-b border-gray-200 pb-4 md:flex">
      <div className="mb-4 flex items-center gap-2 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-800">{tournament.name}</h1>
        <StatusBadge
          status={tournament.status}
          statusMap={tournamentStatusMap}
        />
        <Link
          href={`/torneos/${tournament.id}`}
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
      </div>
      {tournament.startDate && (
        <div className="text-sm font-semibold text-gray-500">
          {formatDate(tournament.startDate)}
        </div>
      )}
      {tournament.status === TournamentStatus.Upcoming && (
        <Button
          onClick={handleStartTournament}
          disabled={isLoading}
          label={isLoading ? 'Iniciando...' : 'Iniciar Torneo'}
        />
      )}
      {tournament.status === TournamentStatus.InProgress && (
        <Button
          variant={ButtonVariant.DANGER}
          onClick={handleFinishTournament}
          disabled={isLoading}
          label={isLoading ? 'Finalizando...' : 'Finalizar Torneo'}
        />
      )}
    </div>
  )
}
