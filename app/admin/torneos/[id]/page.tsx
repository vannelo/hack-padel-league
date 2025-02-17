import { notFound } from 'next/navigation'

import { getAllPlayers } from '@/app/actions/playerActions'
import { getTournamentById } from '@/app/actions/tournamentActions'
import TournamentContent from '@/components/Tournament/TournamentContent/TournamentContent'

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const tournament = await getTournamentById(params.id)
  const players = await getAllPlayers()

  if (!tournament) {
    notFound()
  }

  return (
    <div className="container mx-auto py-16">
      <TournamentContent initialTournament={tournament} players={players} />
    </div>
  )
}
