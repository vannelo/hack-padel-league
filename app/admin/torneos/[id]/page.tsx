import { getTournamentById } from "@/app/actions/tournamentActions";
import TournamentDetails from "@/components/Tournament/TournamentDetails/TournamentDetails";

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    return <p>Tournament not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <section className="my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tournament: {tournament.name}
        </h1>
        <TournamentDetails tournament={tournament} />
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Rounds</h2>
        {tournament.rounds.length > 0 ? (
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {tournament.rounds.map((round: any) => (
              <div key={round.id} className="mb-4">
                <h3 className="text-md font-semibold">
                  Round {round.number} ({round.status})
                </h3>
                <ul className="list-disc list-inside">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {round.matches.map((match: any) => (
                    <li key={match.id}>
                      {match.couple1.player1.name} &{" "}
                      {match.couple1.player2.name} vs{" "}
                      {match.couple2.player1.name} &{" "}
                      {match.couple2.player2.name} - Score:{" "}
                      {match.couple1Score || 0}-{match.couple2Score || 0}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No rounds have been created yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700">Winners</h2>
        {tournament.winnerCouples.length > 0 ? (
          <ul className="list-disc list-inside">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {tournament.winnerCouples.map((couple: any) => (
              <li key={couple.id}>
                {couple.player1.name} & {couple.player2.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No winners have been declared yet.</p>
        )}
      </section>
    </div>
  );
}
