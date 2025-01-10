/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { startLeague } from "@/app/actions/leagueActions";
import Link from "next/link";

export default function LeagueDetails({
  league,
}: {
  league: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  async function handleStartLeague() {
    try {
      await startLeague(league.id);
      alert("League started successfully!");
      // Optionally, reload the page or revalidate data
    } catch (error) {
      alert((error as Error).message);
    }
  }

  console.log("league", league);

  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Details</h2>
        <p>
          <strong>Status:</strong> {league.status}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(league.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {league.endDate
            ? new Date(league.endDate).toLocaleDateString()
            : "Not ended yet"}
        </p>
      </section>

      {league.status === "Upcoming" && (
        <button
          onClick={handleStartLeague}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          Start League
        </button>
      )}

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Rounds</h2>
        {league.rounds && league.rounds.length > 0 ? (
          <div className="mt-4">
            {league.rounds.map((round: any) => (
              <div
                key={round.id}
                className="border border-gray-200 rounded p-4 mb-4"
              >
                <h3 className="text-md font-semibold">Round {round.number}</h3>
                {round.couples && round.couples.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {round.couples.map((couple: any) => (
                      <li key={couple.id}>
                        {couple.player1.name} & {couple.player2.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No couples assigned yet.
                  </p>
                )}

                {/* Dummy link for round tournament */}
                <Link href={`/round-tournament/${round.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                    Go to Round Tournament
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">
            No rounds created for this league yet.
          </p>
        )}
      </section>
    </>
  );
}
