import { getTournamentById } from "@/app/actions/tournamentActions";
import TournamentDetails from "@/components/Tournament/TournamentDetails/TournamentDetails";
import TournamentRounds from "@/components/Tournament/TournamentRounds/TournamentRounds";

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
      <TournamentRounds tournament={tournament} />
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
