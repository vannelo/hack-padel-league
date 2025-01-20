"use client";

import { addCoupleToTournament } from "@/app/actions/tournamentActions";
import { useState } from "react";
import { Tournament, Player, TournamentCouple } from "@prisma/client";

interface TournamentWithCouples extends Tournament {
  couples: TournamentCouple[];
}

interface TournamentCoupleAssignmentFormProps {
  tournaments: TournamentWithCouples[];
  players: Player[];
}

export default function TournamentCoupleAssignmentForm({
  tournaments,
  players,
}: TournamentCoupleAssignmentFormProps) {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(
    null
  );
  const [selectedPlayer1, setSelectedPlayer1] = useState<string | null>(null);

  const getAvailablePlayers = () => {
    if (!selectedTournament) return players;

    const tournament = tournaments.find(
      (tournament) => tournament.id === selectedTournament
    );

    if (!tournament) return players;

    const playersInCouples = new Set(
      tournament.couples.flatMap((couple) => [
        couple.player1Id,
        couple.player2Id,
      ])
    );

    return players.filter((player) => !playersInCouples.has(player.id));
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
      className="max-w-md p-6 border border-gray-300 rounded-lg shadow-md bg-white"
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
          {tournaments.map((tournament) => (
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
          {availablePlayers.map((player) => (
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
          {availablePlayers
            .filter((player) => player.id !== selectedPlayer1)
            .map((player) => (
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
