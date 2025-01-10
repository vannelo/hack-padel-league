import { getLeagueById } from "@/app/actions/leagueActions";
import LeagueDetails from "@/components/League/LeagueDetails/LeagueDetails";

export default async function LeagueDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const league = await getLeagueById(params.id);

  if (!league) {
    return <p>League not found.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <section className="my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          League: {league.name}
        </h1>
        <LeagueDetails league={league} />
      </section>
    </div>
  );
}
