"use client";

import { useState } from "react";
import { TournamentMatchStatus } from "@prisma/client";
import { updateMatchScore } from "@/app/actions/tournamentActions";

function Input({
  type,
  value,
  onChange,
  className,
  min,
  disabled,
}: {
  type: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      min={min}
      disabled={disabled}
    />
  );
}

function Button({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function TournamentRounds({
  tournament,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tournament: any; // Consider creating a proper type for this
}) {
  const [scores, setScores] = useState<
    Record<string, { couple1Score: number; couple2Score: number }>
  >({});
  const [loadingMatches, setLoadingMatches] = useState<Record<string, boolean>>(
    {}
  );

  const handleScoreChange = (
    matchId: string,
    coupleNumber: 1 | 2,
    score: number
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [`couple${coupleNumber}Score`]: score,
      },
    }));
  };

  const handleUpdateScore = async (matchId: string) => {
    const matchScores = scores[matchId];
    if (matchScores) {
      setLoadingMatches((prev) => ({ ...prev, [matchId]: true }));
      try {
        await updateMatchScore({
          matchId,
          couple1Score: matchScores.couple1Score,
          couple2Score: matchScores.couple2Score,
        });
        alert(`Score updated successfully for match ${matchId}`);
        // You might want to refresh the tournament data here
      } catch (error) {
        console.error("Error updating score:", error);
        alert(
          `Error updating score for match ${matchId}: ${
            (error as Error).message
          }`
        );
      } finally {
        setLoadingMatches((prev) => ({ ...prev, [matchId]: false }));
      }
    }
  };

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Rounds</h2>
      {tournament.rounds.length > 0 ? (
        <div className="space-y-6">
          {/* eslint-disable-next-line */}
          {tournament.rounds.map((round: any) => (
            <div key={round.id} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-md font-semibold mb-3">
                Round {round.number} ({round.status})
              </h3>
              <ul className="space-y-4">
                {/* eslint-disable-next-line */}
                {round.matches.map((match: any) => (
                  <li
                    key={match.id}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {match.couple1.player1.name} &{" "}
                          {match.couple1.player2.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">vs</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {match.couple2.player1.name} &{" "}
                          {match.couple2.player2.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={
                            scores[match.id]?.couple1Score ??
                            match.couple1Score ??
                            0
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              match.id,
                              1,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16"
                          min={0}
                          disabled={
                            loadingMatches[match.id] ||
                            match.status === TournamentMatchStatus.Completed
                          }
                        />
                        <span className="text-gray-500">-</span>
                        <Input
                          type="number"
                          value={
                            scores[match.id]?.couple2Score ??
                            match.couple2Score ??
                            0
                          }
                          onChange={(e) =>
                            handleScoreChange(
                              match.id,
                              2,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16"
                          min={0}
                          disabled={
                            loadingMatches[match.id] ||
                            match.status === TournamentMatchStatus.Completed
                          }
                        />
                        <Button
                          onClick={() => handleUpdateScore(match.id)}
                          className={
                            match.status === TournamentMatchStatus.Completed
                              ? "bg-gray-400"
                              : loadingMatches[match.id]
                              ? "bg-blue-300"
                              : ""
                          }
                          disabled={
                            loadingMatches[match.id] ||
                            match.status === TournamentMatchStatus.Completed
                          }
                        >
                          {match.status === TournamentMatchStatus.Completed
                            ? "Completed"
                            : loadingMatches[match.id]
                            ? "Updating..."
                            : "Update"}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No rounds have been created yet.</p>
      )}
    </section>
  );
}
