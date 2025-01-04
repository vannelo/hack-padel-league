import { getAllPlayers } from "@/app/actions/playerActions";
import PlayerCreationForm from "@/components/Player/PlayerCreationForm/PlayerCreationForm";
import PlayerTable from "@/components/Player/PlayerTable/PlayerTable";

export default async function AdminPlayers() {
  // Fetch the players
  const players = await getAllPlayers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Players</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Players List
        </h2>
        <PlayerTable players={players} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Add a New Player
        </h2>
        <PlayerCreationForm />
      </section>
    </div>
  );
}
