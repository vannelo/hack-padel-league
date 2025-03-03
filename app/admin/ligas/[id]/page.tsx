import { notFound } from 'next/navigation'

import { getLeagueById } from '@/app/actions/leagueActions'
import { getAllPlayers } from '@/app/actions/playerActions'
import LeagueDetails from '@/components/Admin/League/LeagueDetails/LeagueDetails'
import { League } from '@/types/league'

export default async function LeagueDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const league = await getLeagueById(params.id)
  const players = await getAllPlayers()

  if (!league) {
    notFound()
  }

  return <LeagueDetails initialLeague={league as League} players={players} />
}
