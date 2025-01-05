"use client";

// eslint-disable-next-line
export default function LeagueTable({ leagues }: { leagues: any[] }) {
  console.log("leagues", leagues[0].players);

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">League</th>
          <th className="border border-gray-300 px-4 py-2">Level</th>
          <th className="border border-gray-300 px-4 py-2">Start Date</th>
          <th className="border border-gray-300 px-4 py-2">End Date</th>
          <th className="border border-gray-300 px-4 py-2">Players</th>
        </tr>
      </thead>
      <tbody>
        {leagues.map((league) => (
          <tr key={league.id}>
            <td className="border border-gray-300 px-4 py-2">{league.name}</td>
            <td className="border border-gray-300 px-4 py-2">{league.level}</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(league.startDate).toLocaleDateString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(league.endDate).toLocaleDateString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {league.players && league.players.length > 0 ? (
                <ul className="list-disc list-inside">
                  {/* eslint-disable-next-line */}
                  {league.players.map((player: any) => (
                    <li key={player.id} className="text-gray-700">
                      {player.player.name} ({player.points} points)
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">No players</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
