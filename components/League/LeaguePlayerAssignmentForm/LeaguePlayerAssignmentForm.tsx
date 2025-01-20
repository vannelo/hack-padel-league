"use client";

import { addPlayerToLeague } from "@/app/actions/leagueActions";

interface LeaguePlayerAssignmentFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leagues: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any[];
}

export default function LeaguePlayerAssignmentForm({
  leagues,
  players,
}: LeaguePlayerAssignmentFormProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const leagueId = formData.get("leagueId") as string;
    const playerId = formData.get("playerId") as string;

    if (!leagueId || !playerId) {
      alert("Please select both a league and a player!");
      return;
    }

    // Call the server action to add the player to the league
    await addPlayerToLeague({ leagueId, playerId, points: 0 });
    alert("Player added to the league successfully!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <div className="mb-4">
        <label
          htmlFor="leagueId"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select League:
        </label>
        <select
          id="leagueId"
          name="leagueId"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select a League --</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="playerId"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Player:
        </label>
        <select
          id="playerId"
          name="playerId"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select a Player --</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Add Player to League
      </button>
    </form>
  );
}
