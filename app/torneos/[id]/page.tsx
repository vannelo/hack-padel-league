import { TournamentType } from '@prisma/client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getTournamentById } from '@/app/actions/tournamentActions'
import { TournamentLiveUpdater } from '@/components/Tournament/TournamentLiveUpdater/TournamentLiveUpdater'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const tournament = await getTournamentById(params.id)

  if (!tournament) {
    return {
      title: 'Torneo no encontrado | Hack Padel',
      description: 'El torneo que buscas no existe o ha sido eliminado.',
    }
  }

  return {
    title: `Torneo | ${tournament.name} | Hack Padel`,
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
  }
}

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const tournament = await getTournamentById(params.id)

  if (!tournament) {
    notFound()
  }

  return (
    <TournamentLiveUpdater tournamentId={params.id}>
      <div className="p-2">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-center text-2xl font-bold md:text-4xl">
            {tournament.name}
          </h2>
          <h3 className="text-md tracking-[16px] text-primary md:text-lg">
            TORNEO
          </h3>
          {tournament.type === TournamentType.League && (
            <div className="mb-4 font-bold uppercase text-white">
              Liga:{' '}
              <Link
                href={`/ligas/${tournament.leagueId}`}
                className="text-primary hover:underline"
              >
                {tournament.league?.name}
              </Link>
            </div>
          )}
          {tournament.winnerCouples.length > 0 && (
            <div className="text-center">
              <h4 className="inline-block w-auto border-b border-primary font-bold text-primary">
                Ganadores
              </h4>
              <ul>
                {tournament.winnerCouples.map((couple) => (
                  <li
                    key={couple.id}
                    className="block w-full text-center text-xl font-bold"
                  >
                    {couple.player1.name} / {couple.player2.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="block gap-8 md:flex">
          {/* JUGADORES */}
          <div className="mb-8 w-full md:w-1/4">
            <div className="rounded-[32px] border p-8">
              <h4 className="mb-4 border-b border-primary font-bold text-primary">
                Jugadores
              </h4>
              <ul>
                {tournament.couples.map((couple, idx) => (
                  <li key={couple.id} className="flex justify-between">
                    <span className="inline-block">
                      {idx + 1} - {couple.player1.name}
                      <br></br>/ {couple.player2.name}
                    </span>
                    <span>
                      <strong className="text-primary">{couple.score}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* RONDAS */}
          <div className="w-full md:w-3/4">
            <ul>
              {tournament.rounds && tournament.rounds.length > 0 ? (
                tournament.rounds.map((round) => (
                  <div
                    key={round.id}
                    className="mb-8 rounded-[32px] border p-8"
                  >
                    <h4 className="mb-4 border-b border-primary font-bold text-primary">
                      Ronda {round.number}
                    </h4>
                    {round.matches.length > 0 && (
                      <div>
                        <div className="mt-2">
                          {round.matches.map((match) => (
                            <div
                              className="mb-2 block items-center p-2 text-center md:mb-0 md:flex"
                              key={match.id}
                            >
                              <div className="mb-2 flex-1 text-center md:mb-0 md:text-right">
                                {match.couple1.player1.name} y{' '}
                                {match.couple1.player2.name}
                              </div>
                              <div className="mx-4 mb-2 inline-block md:mb-0 md:block">
                                <div className="rounded-full bg-primary px-4 py-1 font-bold text-black">
                                  {match.status === 'Completed' ? (
                                    `${match.couple1Score} - ${match.couple2Score}`
                                  ) : (
                                    <span className="text-[12px]">
                                      Por jugar
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 text-center md:text-left">
                                {match.couple2.player1.name} y{' '}
                                {match.couple2.player2.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex min-h-[300px] items-center justify-center">
                  <p className="text-center text-gray-400">
                    El torneo aún no tiene rondas asignadas.
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </TournamentLiveUpdater>
  )
}
