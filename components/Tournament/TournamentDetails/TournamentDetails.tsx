"use client";

import {
  startTournament,
  finishTournament,
} from "@/app/actions/tournamentActions";
import { useState } from "react";

// eslint-disable-next-line
export default function TournamentDetails({ tournament }: { tournament: any }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleStartTournament() {
    setIsLoading(true);
    try {
      await startTournament(tournament.id);
      alert("Tournament started successfully!");
      // Optionally, reload the page or revalidate data
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFinishTournament() {
    setIsLoading(true);
    try {
      await finishTournament(tournament.id);
      alert("Tournament finished successfully!");
      // Optionally, reload the page or revalidate data
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Details</h2>
        <p>
          <strong>Status:</strong> {tournament.status}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(tournament.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {tournament.endDate
            ? new Date(tournament.endDate).toLocaleDateString()
            : "Not ended yet"}
        </p>
        <p>
          <strong>Available Courts:</strong> {tournament.availableCourts}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Couples</h2>
        {tournament.couples.length > 0 ? (
          <ul className="list-disc list-inside">
            {/* eslint-disable-next-line */}
            {tournament.couples.map((couple: any) => (
              <li key={couple.id}>
                {couple.player1.name} & {couple.player2.name} - Score:{" "}
                {couple.score}
              </li>
            ))}
          </ul>
        ) : (
          <p>No couples assigned to this tournament.</p>
        )}
      </section>

      {tournament.status === "Upcoming" && (
        <button
          onClick={handleStartTournament}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Starting..." : "Start Tournament"}
        </button>
      )}

      {tournament.status === "InProgress" && (
        <button
          onClick={handleFinishTournament}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Finishing..." : "Finish Tournament"}
        </button>
      )}
    </>
  );
}
