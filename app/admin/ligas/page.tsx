import { getAllLeagues } from "@/app/actions/leagueActions";
import { getAllPlayers } from "@/app/actions/playerActions";
import LeagueCreationForm from "@/components/League/LeagueCreationForm/LeagueCreationForm";
import LeaguePlayerAssignmentForm from "@/components/League/LeaguePlayerAssignmentForm/LeaguePlayerAssignmentForm";
import LeagueTable from "@/components/League/LeagueTable/LeagueTable";

export default async function AdminLeagues() {
  // Fetch the players
  const leagues = await getAllLeagues();
  const players = await getAllPlayers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Ligas</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Ligas Registradas
        </h2>
        <LeagueTable leagues={leagues} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Crear liga</h2>
        <LeagueCreationForm />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Agregar jugador a liga
        </h2>
        <LeaguePlayerAssignmentForm leagues={leagues} players={players} />
      </section>
    </div>
  );
}
