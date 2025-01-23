"use client";

import { startLeague } from "@/app/actions/leagueActions";
import Link from "next/link";
import { useState } from "react";

export default function LeagueDetails({
  league,
}: {
  league: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const [isStarting, setIsStarting] = useState(false);

  async function handleStartLeague() {
    setIsStarting(true);
    try {
      await startLeague(league.id);
      alert("League started successfully!");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsStarting(false);
    }
  }

  const activePlayers = league.players.filter(
    // eslint-disable-next-line
    (player: any) => player.status !== "Deleted"
  );
  const canStartLeague =
    activePlayers.length >= 4 && activePlayers.length % 2 === 0;

  console.log("LeagueDetails", league);
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
        <div>
          <button
            onClick={handleStartLeague}
            disabled={isStarting || !canStartLeague}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:bg-green-300"
          >
            {isStarting ? "Starting..." : "Start League"}
          </button>
          {!canStartLeague && (
            <p className="text-sm text-red-600 mt-2">
              League can only start with at least 4 active players and an even
              number of players.
            </p>
          )}
        </div>
      )}

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Players</h2>
        {league.players && league.players.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {/* eslint-disable-next-line */}
            {league.players.map((player: any) => (
              <li
                key={player.id}
                className={`flex items-center justify-between p-2 rounded ${
                  player.status === "Deleted" ? "bg-red-100" : "bg-gray-100"
                }`}
              >
                <span className="font-medium">{player.player.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{player.points} points</span>
                  {player.status === "Deleted" && (
                    <span className="text-xs text-red-600 font-semibold">
                      Inactive
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-4">
            No players assigned to this league yet.
          </p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Rounds</h2>
        {league.rounds && league.rounds.length > 0 ? (
          <div className="mt-4 space-y-4">
            {/* eslint-disable-next-line */}
            {league.rounds.map((round: any) => (
              <div
                key={round.id}
                className="border border-gray-200 rounded p-4"
              >
                <h3 className="text-md font-semibold">Round {round.number}</h3>
                {round.couples && round.couples.length > 0 ? (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {/* eslint-disable-next-line */}
                    {round.couples.map((couple: any) => (
                      <li key={couple.id} className="text-sm">
                        {couple.player1.name} & {couple.player2.name}
                        {(couple.player1.status === "Deleted" ||
                          couple.player2.status === "Deleted") && (
                          <span className="text-xs text-red-600 ml-2">
                            (Inactive player)
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No couples assigned yet.
                  </p>
                )}

                {round.tournament ? (
                  <Link href={`/admin/torneos/${round.tournament.id}`}>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                      Go to Round Tournament
                    </button>
                  </Link>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No tournament created for this round yet.
                  </p>
                )}
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
