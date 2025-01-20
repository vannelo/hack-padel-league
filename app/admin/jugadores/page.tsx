import { getAllPlayers } from "@/app/actions/playerActions";
import PlayerCreationForm from "@/components/Player/PlayerCreationForm/PlayerCreationForm";
import PlayerTable from "@/components/Player/PlayerTable/PlayerTable";

export default async function AdminPlayers() {
  // Fetch the players
  const players = await getAllPlayers();

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Jugadores</h1>
      <section className="mb-8">
        <PlayerTable players={players} />
      </section>
      <section className="mb-8 flex">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Crear jugador
          </h2>
          <PlayerCreationForm />
        </div>
      </section>
    </div>
  );
}
