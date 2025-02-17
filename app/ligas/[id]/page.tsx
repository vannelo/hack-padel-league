import { TournamentStatus } from '@prisma/client'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getLeagueById } from '@/app/actions/leagueActions'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const league = await getLeagueById(params.id)

  if (!league) {
    return {
      title: 'Liga no encontrada | Hack Padel',
      description: 'La liga que buscas no existe o ha sido eliminada.',
    }
  }

  return {
    title: `Liga | ${league.name} | Hack Padel`,
    description: `Consulta la clasificación, jugadores y rondas de la liga ${league.name} en Hack Padel.`,
  }
}

export default async function LeagueDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const league = await getLeagueById(params.id)

  if (!league) {
    notFound()
  }

  const sortedPlayers = [...league.players].sort((a, b) => b.points - a.points)

  return (
    <div className="p-2">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold md:text-4xl">{league.name}</h2>
        <h3 className="text-md tracking-[16px] text-primary md:text-lg">
          LIGA
        </h3>
      </div>
      <div className="block gap-8 md:flex">
        {/* JUGADORES */}
        <div className="mb-4 w-full md:w-1/4">
          <div className="mb-8 rounded-[32px] border p-8 shadow-lg">
            <h4 className="mb-4 border-b border-primary font-bold text-primary">
              Jugadores
            </h4>
            <ul>
              {sortedPlayers.map((player, index) => (
                <li
                  key={player.id}
                  className="relative flex h-24 items-end overflow-hidden bg-gray-800 py-4 text-white shadow-md"
                >
                  <div className="absolute inset-0 z-0 h-full w-full">
                    <div className="absolute inset-0 bg-black">
                      <div className="absolute left-[0] top-[20%] h-[300px] w-[450px] rotate-[30deg] bg-zinc-700 opacity-40"></div>
                      <div className="absolute left-[0] top-[20%] h-[350px] w-[150px] rotate-[35deg] bg-zinc-600 opacity-30"></div>
                      <div className="absolute left-[15%] top-[30%] h-[300px] w-[150px] rotate-[55deg] bg-zinc-500 opacity-20"></div>
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 h-full w-10">
                    <div className="absolute left-0 top-[-40px] h-[200px] w-10 translate-x-2 rotate-[-20deg] bg-primary"></div>
                    <div className="absolute left-12 top-[-40px] h-[200px] w-1 translate-x-2 rotate-[-20deg] bg-primary"></div>
                  </div>
                  <div className="absolute inset-0 z-0 h-full w-full">
                    <h3 className="absolute bottom-2 left-3 flex h-10 w-10 items-center justify-center rounded-full border-primary bg-black text-xl font-bold text-white">
                      {index + 1}
                    </h3>
                    <div className="absolute bottom-0 right-2 text-right">
                      <p className="text-mg font-semibold">
                        {player.player.name}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {index < 3 && (
                          <span className="mr-2 inline-block animate-bounce text-xl text-green-600">
                            ↑
                          </span>
                        )}
                        {index >= sortedPlayers.length - 3 && (
                          <span className="mr-2 inline-block animate-bounce text-xl text-red-600">
                            ↓
                          </span>
                        )}
                        {player.points} pts
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* RONDAS */}
        <div className="w-full md:w-3/4">
          <ul>
            {league.rounds &&
              league.rounds.length > 0 &&
              league.rounds.map((round) => (
                <div key={round.id} className="mb-8 rounded-[32px] border p-8">
                  <h4 className="mb-4 border-b border-primary font-bold text-primary">
                    Jornada {round.number}
                  </h4>
                  <div className="block gap-4 md:flex">
                    <div className="w-full md:w-1/4">
                      {round.tournament?.status ===
                        TournamentStatus.Upcoming && (
                        <div>
                          <p className="font-bold text-white">Pendiente</p>
                          {round.tournament.startDate && (
                            <p>
                              <strong>Fecha:</strong>{' '}
                              {new Date(
                                round.tournament.startDate
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                      {round.tournament?.winnerCouples &&
                        round.tournament.winnerCouples.length > 0 && (
                          <div>
                            <p className="font-bold">Ganadores:</p>
                            <p className="text-primary">
                              {round.tournament?.winnerCouples[0].player1.name}{' '}
                              /{' '}
                              {
                                round.tournament?.winnerCouples[0].player2.name
                              }{' '}
                            </p>
                          </div>
                        )}
                    </div>
                    <div className="mb-4 w-full md:w-3/4">
                      <p>
                        <strong>Parejas</strong>
                      </p>
                      <ul>
                        {round.couples.map((couple) => (
                          <li key={couple.id}>
                            {couple.player1.name} / {couple.player2.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <a
                      href={
                        round.tournament
                          ? `/torneos/${round.tournament.id}`
                          : '#'
                      }
                      className="inline-block rounded-lg bg-primary px-4 py-2 font-bold text-black"
                    >
                      Ver Torneo
                    </a>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
