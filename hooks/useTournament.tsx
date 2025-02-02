import { useState, useCallback } from "react";
import type { Tournament } from "@/types/tournament";
import {
  finishTournament as finishTournamentAction,
  getTournamentById,
} from "@/app/actions/tournamentActions";

export function useTournament(initialTournament: Tournament) {
  const [tournament, setTournament] = useState<Tournament | null>(
    initialTournament
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchTournament = useCallback(async () => {
    if (!tournament) return;
    setIsLoading(true);
    try {
      const fetchedTournament = await getTournamentById(tournament.id);
      setTournament(fetchedTournament);
    } catch (error) {
      console.error("Error fetching tournament:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tournament]);

  const finishTournament = useCallback(async () => {
    if (!tournament) return;
    setIsLoading(true);
    try {
      await finishTournamentAction(tournament.id);
      await fetchTournament();
    } finally {
      setIsLoading(false);
    }
  }, [tournament, fetchTournament]);

  const areAllMatchesPlayed = useCallback((tournamentToCheck: Tournament) => {
    if (tournamentToCheck.rounds.length === 0) return false;
    return tournamentToCheck.rounds.every((round) =>
      round.matches.every((match) => match.status === "Completed")
    );
  }, []);

  return {
    tournament,
    isLoading,
    fetchTournament,
    finishTournament,
    areAllMatchesPlayed: tournament ? areAllMatchesPlayed(tournament) : false,
  };
}
