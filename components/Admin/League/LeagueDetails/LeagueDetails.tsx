'use client';

import { useCallback, useState } from 'react';

import { getLeagueById } from '@/app/actions/leagueActions';
import TableLoader from '@/components/Admin/UI/TableLoader/TableLoader';
import { TEXT } from '@/constants/text';
import { useSnackbar } from '@/hooks/useSnackBar';
import { League } from '@/types/league';
import { Player } from '@/types/player';

import LeagueDetailsHeader from './LeagueDetailsHeader';
import LeagueDetailsRanking from './LeagueDetailsRanking';
import LeagueDetailsRounds from './LeagueDetailsRounds';

interface LeagueDetailsProps {
  initialLeague: League;
  players: Player[];
}

export default function LeagueDetails({
  initialLeague,
  players,
}: LeagueDetailsProps) {
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
      console.error(TEXT.admin.leagues.errorFetchingLeague);
    } finally {
      setIsLoading(false);
    }
  }, [league]);

  const handleLeagueUpdate = useCallback(() => {
    fetchLeague();
  }, [fetchLeague]);

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <div className="container mx-auto py-16">
      <LeagueDetailsHeader
        league={league}
        showSnackbar={showSnackbar}
        onLeagueUpdate={handleLeagueUpdate}
      />
      <div className="block gap-8 md:flex">
        <div className="mb-4 w-full md:w-1/4">
          <LeagueDetailsRanking
            league={league}
            players={players}
            onLeagueUpdate={handleLeagueUpdate}
          />
        </div>
        <div className="w-full md:w-3/4">
          <LeagueDetailsRounds rounds={league.rounds} />
        </div>
      </div>
    </div>
  );
}
