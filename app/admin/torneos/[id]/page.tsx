import { notFound } from 'next/navigation';

import { getAllPlayers } from '@/app/actions/playerActions';
import { getTournamentById } from '@/app/actions/tournamentActions';
import TournamentDetails from '@/components/Admin/Tournament/TournamentDetails/TournamentDetails';

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await getTournamentById(params.id);
  const players = await getAllPlayers();

  if (!tournament) {
    notFound();
  }

  return <TournamentDetails initialTournament={tournament} players={players} />;
}
