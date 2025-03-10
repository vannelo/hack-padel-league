import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTournamentById } from '@/app/actions/tournamentActions';
import { TournamentLiveUpdater } from '@/components/User/Tournament/TournamentLiveUpdater/TournamentLiveUpdater';
import TournamentLiveView from '@/components/User/Tournament/TournamentLiveView/TournamentLiveView';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    return {
      title: 'Torneo no encontrado | Hack Padel',
      description: 'El torneo que buscas no existe o ha sido eliminado.',
    };
  }

  return {
    title: `Torneo | ${tournament.name} en vivo | Hack Padel`,
    description: `Consulta los resultados, parejas y rondas del torneo ${tournament.name} en Hack Padel.`,
    openGraph: {
      title: `${tournament.name} | Torneo de Hack Padel`,
      description: `Descubre los jugadores, resultados y clasificaciones del torneo ${tournament.name}.`,
      url: `https://hackpadel.com/torneos/${tournament.id}`,
      type: 'website',
      images: [
        {
          url: '/img/meta.jpg',
          width: 1500,
          height: 800,
          alt: 'Hack Padel Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hackpadel',
      title: `${tournament.name} | Torneo de Hack Padel`,
      description: `Consulta los resultados, parejas y rondas del torneo ${tournament.name} en Hack Padel.`,
      images: ['/img/meta.jpg'],
    },
  };
}

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  return (
    <TournamentLiveUpdater tournamentId={params.id}>
      <TournamentLiveView tournament={tournament} />
    </TournamentLiveUpdater>
  );
}
