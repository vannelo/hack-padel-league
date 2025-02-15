'use client'

import { useCallback } from 'react'
import { CircularProgress } from '@mui/material'
import { notFound } from 'next/navigation'
import type { Tournament } from '@/types/tournament'
import type { Player } from '@/types/player'
import { useSnackbar } from '@/hooks/useSnackBar'
import TournamentContentRounds from './TournamentContentRounds'
import { useTournament } from '@/hooks/useTournament'
import TournamentContentHeader from './TournamentContentHeader'
import TournamentContentScores from './TournamentContentScores'

interface TournamentContentProps {
  initialTournament: Tournament
  players: Player[]
}

export default function TournamentContent({
  initialTournament,
  players,
}: TournamentContentProps) {
  const { showSnackbar } = useSnackbar()
  const { tournament, isLoading, fetchTournament } =
    useTournament(initialTournament)

  const handleTournamentUpdate = useCallback(() => {
    fetchTournament()
  }, [fetchTournament])

  if (!tournament) {
    notFound()
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <TournamentContentHeader
        tournament={tournament}
        showSnackbar={showSnackbar}
        onTournamentUpdate={handleTournamentUpdate}
      />
      <div className="block gap-8 md:flex">
        <div className="mb-4 w-full md:w-2/6">
          <TournamentContentScores
            tournament={tournament}
            players={players}
            showSnackbar={showSnackbar}
            onTournamentUpdate={handleTournamentUpdate}
          />
        </div>
        <div className="w-full md:w-4/6">
          <TournamentContentRounds
            tournament={tournament}
            showSnackbar={showSnackbar}
            onTournamentUpdate={handleTournamentUpdate}
          />
        </div>
      </div>
    </>
  )
}
