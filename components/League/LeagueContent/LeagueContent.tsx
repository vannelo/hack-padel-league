"use client";

import { useCallback, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getLeagueById } from "@/app/actions/leagueActions";
import { useSnackbar } from "@/hooks/useSnackBar";
import { League } from "@/types/league";
import LeagueContentDetails from "./LeagueContentDetails";
import LeagueContentHeaderButton from "./LeagueContentHeaderButton";
import LeagueContentCouples from "./LeagueContentCouples";
import { Player } from "@/types/player";
import LeagueContentRounds from "./LeagueContentRounds";

interface LeagueContentProps {
  initialLeague: League;
  players: Player[];
}

export default function LeagueContent({
  initialLeague,
  players,
}: LeagueContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [league, setLeague] = useState(initialLeague);
  const { showSnackbar } = useSnackbar();

  const fetchLeague = useCallback(async () => {
    if (!league) return;
    setIsLoading(true);
    try {
      const fetchedLeague = await getLeagueById(league.id);
      setLeague(fetchedLeague as League);
    } catch {
      console.error("Error fetching league:");
    } finally {
      setIsLoading(false);
    }
  }, [league]);

  const handleLeagueUpdate = useCallback(() => {
    fetchLeague();
  }, [fetchLeague]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <LeagueContentHeaderButton
        league={league}
        showSnackbar={showSnackbar}
        onLeagueUpdate={handleLeagueUpdate}
      />
      <LeagueContentDetails league={league} />
      <LeagueContentCouples
        league={league}
        players={players}
        showSnackbar={showSnackbar}
        onLeagueUpdate={handleLeagueUpdate}
      />
      <LeagueContentRounds rounds={league.rounds} />
    </Box>
  );
}
