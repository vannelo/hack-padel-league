'use client'

import { CircularProgress } from '@mui/material'
import { notFound } from 'next/navigation'
import { useCallback } from 'react'

import { useSnackbar } from '@/hooks/useSnackBar'
import { useTournament } from '@/hooks/useTournament'
import type { Player } from '@/types/player'
import type { Tournament } from '@/types/tournament'

import TournamentContentHeader from './TournamentContentHeader'
import TournamentContentRounds from './TournamentContentRounds'
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
