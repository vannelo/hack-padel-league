import { getAllLeagues } from "@/app/actions/leagueActions";
import { getAllPlayers } from "@/app/actions/playerActions";
import LeagueCreationForm from "@/components/League/LeagueCreationForm/LeagueCreationForm";
import LeaguePlayerAssignmentForm from "@/components/League/LeaguePlayerAssignmentForm/LeaguePlayerAssignmentForm";
import LeagueTable from "@/components/League/LeagueTable/LeagueTable";

export default async function AdminLeagues() {
  const leagues = await getAllLeagues();
  const players = await getAllPlayers();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ligas</h1>
      <section className="mb-8">
        <LeagueTable leagues={leagues} />
      </section>
      <section className="mb-8 flex">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Crear liga
          </h2>
          <LeagueCreationForm />
        </div>
        <div className="w-1/3">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Agregar jugador a liga
          </h2>
          <LeaguePlayerAssignmentForm leagues={leagues} players={players} />
        </div>
      </section>
    </div>
  );
}
