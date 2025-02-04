import type { Metadata } from "next";
import { getTournamentById } from "@/app/actions/tournamentActions";
import Image from "next/image";
import { notFound } from "next/navigation";

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
          url: "/img/hack-logo.png",
          width: 1200,
          height: 630,
          alt: "Hack Padel Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@hackpadel",
      title: `${tournament.name} | Torneo de Hack Padel`,
      description: `Consulta los resultados, parejas y rondas del torneo ${tournament.name} en Hack Padel.`,
      images: ["/img/hack-logo.png"],
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
    <div className="bg-black text-white min-h-[100vh]">
      <div className="container mx-auto py-16 px-8">
        {/* HEADER */}
        <div className="flex flex-col justify-center items-center mb-8">
          <Image
            src="/img/hack-logo.png"
            width={160}
            height={160}
            alt="Hack Padel Logo"
            className="mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold text-center">{tournament.name}</h2>
          <h3 className="text-lg tracking-[16px] text-primary">TORNEO</h3>
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
                  <div
                    key={round.id}
                    className="border rounded-[32px] p-8 mb-8"
                  >
                    <h4 className="text-primary font-bold border-b border-primary mb-4">
                      Ronda {round.number}
                    </h4>
                    {round.matches.length > 0 && (
                      <div>
                        <div className="mt-2">
                          {round.matches.map((match) => (
                            <div
                              key={match.id}
                              className="pl-4 border-l border-gray-500 mb-2"
                            >
                              <p>
                                {match.couple1.player1.name} y{" "}
                                {match.couple1.player2.name} vs{" "}
                                {match.couple2.player1.name} y{" "}
                                {match.couple2.player2.name}
                              </p>
                              <p>
                                <strong>Marcador:</strong>{" "}
                                <span className="text-primary">
                                  {match.status === "Completed"
                                    ? `${match.couple1Score} - ${match.couple2Score}`
                                    : "Por jugar"}
                                </span>
                              </p>
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
    </div>
  );
}
