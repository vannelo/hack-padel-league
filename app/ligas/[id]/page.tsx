import { getLeagueById } from "@/app/actions/leagueActions";
import { TournamentStatus } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function LeagueDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const league = await getLeagueById(params.id);

  if (!league) {
    notFound();
  }

  // Sorting players by points in descending order
  const sortedPlayers = [...league.players].sort((a, b) => b.points - a.points);

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
          <h2 className="text-4xl font-bold">{league.name}</h2>
          <h3 className="text-lg tracking-[16px] text-primary">LIGA</h3>
        </div>
        <div className="block md:flex gap-8">
          {/* JUGADORES */}
          <div className="w-full md:w-1/4 mb-4">
            <div className="border rounded-[32px] p-8">
              <h4 className="text-primary font-bold border-b border-primary mb-4">
                Jugadores
              </h4>
              <ul>
                {sortedPlayers.map((player) => (
                  <li
                    key={player.id}
                    className="flex justify-between items-center"
                  >
                    {player.player.name}
                    <strong>{player.points}</strong>
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
                  <div
                    key={round.id}
                    className="border rounded-[32px] p-8 mb-8"
                  >
                    <h4 className="text-primary font-bold border-b border-primary mb-4">
                      Jornada {round.number}
                    </h4>
                    <div className="block md:flex gap-4">
                      <div className="w-full md:w-1/4">
                        {round.tournament && (
                          <div>
                            <p
                              className={
                                round.tournament.status ===
                                TournamentStatus.Completed
                                  ? "text-green-500 font-bold"
                                  : "text-white font-bold"
                              }
                            >
                              {round.tournament.status ===
                              TournamentStatus.Completed
                                ? "Finalizada"
                                : "Pendiente"}
                            </p>
                            {round.tournament.startDate && (
                              <p>
                                <strong>Fecha:</strong>{" "}
                                {new Date(
                                  round.tournament.startDate
                                ).toLocaleDateString()}
                              </p>
                            )}
                            {/* 🏆 Check for Tournament Winner */}
                            {/* {round.tournament.status === "Completed" &&
                              round.tournament.winnerCouples &&
                              round.tournament.winnerCouples.length > 0 && (
                                <p className="font-bold mt-2">
                                  🏆 <strong>Ganador:</strong>{" "}
                                  {round.tournament.winnerCouples.map(
                                    (couple, index) => (
                                      <span key={couple.id}>
                                        {couple.player1.name} &{" "}
                                        {couple.player2.name}
                                        {index <
                                        round.tournament.winnerCouples.length -
                                          1
                                          ? ", "
                                          : ""}
                                      </span>
                                    )
                                  )}
                                </p>
                              )} */}
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-3/4 mb-4">
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
                            : "#"
                        }
                        className="inline-block bg-primary text-black px-4 py-2 rounded-lg"
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
    </div>
  );
}
