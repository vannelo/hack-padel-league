import type { Metadata } from "next";
import { getTournamentById } from "@/app/actions/tournamentActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TournamentType } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    return {
      title: "Torneo no encontrado | Hack Padel",
      description: "El torneo que buscas no existe o ha sido eliminado.",
    };
  }

  return {
    title: `Torneo | ${tournament.name} | Hack Padel`,
    description: `Consulta los resultados, parejas y rondas del torneo ${tournament.name} en Hack Padel.`,
    openGraph: {
      title: `${tournament.name} | Torneo de Hack Padel`,
      description: `Descubre los jugadores, resultados y clasificaciones del torneo ${tournament.name}.`,
      url: `https://hackpadel.com/torneos/${tournament.id}`,
      type: "website",
      images: [
        {
          url: "/img/meta.jpg",
          width: 1500,
          height: 800,
          alt: "Hack Padel Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@hackpadel",
      title: `${tournament.name} | Torneo de Hack Padel`,
      description: `Consulta los resultados, parejas y rondas del torneo ${tournament.name} en Hack Padel.`,
      images: ["/img/meta.jpg"],
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
    <div className="p-2">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {tournament.name}
        </h2>
        <h3 className="text-md md:text-lg tracking-[16px] text-primary">
          TORNEO
        </h3>
        {tournament.type === TournamentType.League && (
          <div className="uppercase font-bold text-white mb-4">
            Liga:{" "}
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
            <h4 className="text-primary font-bold border-b border-primary w-auto inline-block">
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
      <div className="block md:flex gap-8">
        {/* JUGADORES */}
        <div className="w-full md:w-1/4 mb-8">
          <div className="border rounded-[32px] p-8">
            <h4 className="text-primary font-bold border-b border-primary mb-4">
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
                <div key={round.id} className="border rounded-[32px] p-8 mb-8">
                  <h4 className="text-primary font-bold border-b border-primary mb-4">
                    Ronda {round.number}
                  </h4>
                  {round.matches.length > 0 && (
                    <div>
                      <div className="mt-2">
                        {round.matches.map((match) => (
                          <div
                            className="block md:flex items-center p-2 text-center mb-2 md:mb-0"
                            key={match.id}
                          >
                            <div className="flex-1 text-center md:text-right mb-2 md:mb-0">
                              {match.couple1.player1.name} y{" "}
                              {match.couple1.player2.name}
                            </div>
                            <div className="inline-block md:block mx-4 mb-2 md:mb-0">
                              <div className="bg-primary text-black px-4 py-1 rounded-full font-bold">
                                {match.status === "Completed" ? (
                                  `${match.couple1Score} - ${match.couple2Score}`
                                ) : (
                                  <span className="text-[12px]">Por jugar</span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                              {match.couple2.player1.name} y{" "}
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
              <div className="min-h-[300px] flex justify-center items-center">
                <p className="text-gray-400 text-center">
                  El torneo aún no tiene rondas asignadas.
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
