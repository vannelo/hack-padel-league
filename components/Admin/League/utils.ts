import { PlayerStatus } from '@prisma/client'

import { LeaguePlayer } from '@/types/league'

export const getLeagueActivePlayers = (players: LeaguePlayer[]) => {
  return players.filter(
    (player) => player.player.status !== PlayerStatus.Deleted
  )
}

export const getIsLeagueReady = (activePlayers: LeaguePlayer[]) => {
  return activePlayers.length >= 4 && activePlayers.length % 2 === 0
}

export const getSortedLeaguePlayers = (players: LeaguePlayer[]) => {
  return players.sort((a, b) => b.points - a.points)
}
