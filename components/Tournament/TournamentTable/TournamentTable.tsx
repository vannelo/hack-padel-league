/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export default function TournamentTable({
  tournaments,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tournaments: any;
}) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Couples</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.length > 0 &&
          tournaments.map((tournament: any) => (
            <tr key={tournament.id}>
              <td className="border border-gray-300 px-4 py-2">
                {tournament.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {tournament.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {tournament.couples.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {tournament.couples.map((couple: any) => (
                      <li key={couple.id} className="mb-2">
                        {couple.player1?.name || "Player 1"} &{" "}
                        {couple.player2?.name || "Player 2"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No couples assigned</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link
                  href={`/admin/torneos/${tournament.id}`}
                  className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
