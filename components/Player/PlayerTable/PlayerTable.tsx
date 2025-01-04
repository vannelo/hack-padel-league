"use client";

import { deletePlayer } from "@/app/actions/playerActions";

interface PlayerTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any;
}

export default function PlayerTable({ players }: PlayerTableProps) {
  async function handleDelete(id: string) {
    // Call the server action to add a player
    await deletePlayer(id);
    alert("Player deleted successfully!");
  }

  return (
    <ul className="space-y-2">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {players.map((player: any) => (
        <li
          key={player.id}
          className="p-3 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <div>
            <span className="font-medium text-gray-800">{player.name}</span>{" "}
            <span className="text-sm text-gray-500">(ID: {player.id})</span>
          </div>
          <button
            onClick={() => handleDelete(player.id)}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
