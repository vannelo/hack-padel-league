/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addCoupleToTournament } from "@/app/actions/tournamentActions";
import { useState } from "react";

interface TournamentCoupleAssignmentFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tournaments: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any[];
}

export default function TournamentCoupleAssignmentForm({
  tournaments,
  players,
}: TournamentCoupleAssignmentFormProps) {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(
    null
  );
  const [selectedPlayer1, setSelectedPlayer1] = useState<string | null>(null);

  // Filter out players already in couples for the selected tournament
  const getAvailablePlayers = () => {
    if (!selectedTournament) return players;

    const tournament = tournaments.find(
      (tournament) => tournament.id === selectedTournament
    );

    if (!tournament) return players;

    const playersInCouples = new Set(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tournament.couples.flatMap((couple: any) => [
        couple.player1Id,
        couple.player2Id,
      ])
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return players.filter((player: any) => !playersInCouples.has(player.id));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const tournamentId = formData.get("tournamentId") as string;
    const player1Id = formData.get("player1Id") as string;
    const player2Id = formData.get("player2Id") as string;

    if (!tournamentId || !player1Id || !player2Id) {
      alert("Please select a tournament and two players!");
      return;
    }

    if (player1Id === player2Id) {
      alert("The two players must be different!");
      return;
    }

    await addCoupleToTournament({ tournamentId, player1Id, player2Id });
    alert("Couple added to the tournament successfully!");
  }

  const availablePlayers = getAvailablePlayers();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <div className="mb-4">
        <label
          htmlFor="tournamentId"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Tournament:
        </label>
        <select
          id="tournamentId"
          name="tournamentId"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setSelectedTournament(e.target.value)}
        >
          <option value="">-- Select a Tournament --</option>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {tournaments.map((tournament: any) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="player1Id"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Player 1:
        </label>
        <select
          id="player1Id"
          name="player1Id"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setSelectedPlayer1(e.target.value)}
        >
          <option value="">-- Select Player 1 --</option>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {availablePlayers.map((player: any) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="player2Id"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Player 2:
        </label>
        <select
          id="player2Id"
          name="player2Id"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select Player 2 --</option>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {availablePlayers
            .filter((player: any) => player.id !== selectedPlayer1)
            .map((player: any) => (
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
        Add Couple to Tournament
      </button>
    </form>
  );
}
