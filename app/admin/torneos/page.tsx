import { getAllPlayers } from "@/app/actions/playerActions";
import { getAllTournaments } from "@/app/actions/tournamentActions";
import TournamentCoupleAssignmentForm from "@/components/Tournament/TournamentCoupleAssignmentForm/TournamentCoupleAssignmentForm";
import TournamentForm from "@/components/Tournament/TournamentCreationForm/TournamentCreationForm";
import TournamentTable from "@/components/Tournament/TournamentTable/TournamentTable";

export default async function AdminTournaments() {
  const tournaments = await getAllTournaments();
  const players = await getAllPlayers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Torneos</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Torneos Registradas
        </h2>
        <TournamentTable tournaments={tournaments} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Crear torneo
        </h2>
        <TournamentForm />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Agregar parejas a torneo
        </h2>
        <TournamentCoupleAssignmentForm
          tournaments={tournaments}
          players={players}
        />
      </section>
    </div>
  );
}
