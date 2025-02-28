'use client'

import { CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'

import { getLeagueById } from '@/app/actions/leagueActions'
import { TEXT } from '@/constants/text'
import { useSnackbar } from '@/hooks/useSnackBar'
import { League } from '@/types/league'
import { Player } from '@/types/player'

import LeagueContentHeader from './LeagueContentHeader'
import LeagueContentCouples from './LeagueContentRanking'
import LeagueContentRounds from './LeagueContentRounds'

interface LeagueContentProps {
  initialLeague: League
  players: Player[]
}

export default function LeagueContent({
  initialLeague,
  players,
}: LeagueContentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [league, setLeague] = useState(initialLeague)
  const { showSnackbar } = useSnackbar()

  const fetchLeague = useCallback(async () => {
    if (!league) return
    setIsLoading(true)
    try {
      const fetchedLeague = await getLeagueById(league.id)
      setLeague(fetchedLeague as League)
    } catch {
      console.error(TEXT.admin.leagues.errorFetchingLeague)
    } finally {
      setIsLoading(false)
    }
  }, [league])

  const handleLeagueUpdate = useCallback(() => {
    fetchLeague()
  }, [fetchLeague])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16">
      <LeagueContentHeader
        league={league}
        showSnackbar={showSnackbar}
        onLeagueUpdate={handleLeagueUpdate}
      />
      <div className="block gap-8 md:flex">
        <div className="mb-4 w-full md:w-1/4">
          <LeagueContentCouples
            league={league}
            players={players}
            showSnackbar={showSnackbar}
            onLeagueUpdate={handleLeagueUpdate}
          />
        </div>
        <div className="w-full md:w-3/4">
          <LeagueContentRounds rounds={league.rounds} />
        </div>
      </div>
    </div>
  )
}
