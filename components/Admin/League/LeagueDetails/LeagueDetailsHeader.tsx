'use client';

import { LeagueStatus } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';

import { startLeague } from '@/app/actions/leagueActions';
import Button from '@/components/Admin/UI/Button/Button';
import StatusBadge from '@/components/Admin/UI/StatusBadge/StatusBadge';
import { leagueStatusMap } from '@/constants/leagueEnums';
import { TEXT } from '@/constants/text';
import { SnackbarSeverity } from '@/hooks/useSnackBar';
import { formatDate } from '@/lib/helpers';
import { League } from '@/types/league';

import { getIsLeagueReady, getLeagueActivePlayers } from '../utils';

interface LeagueDetailsHeaderProps {
  league: League;
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  onLeagueUpdate: () => void;
}

export default function LeagueDetailsHeader({
  league,
  showSnackbar,
  onLeagueUpdate,
}: LeagueDetailsHeaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const activePlayers = getLeagueActivePlayers(league.players);
  const isLeagueReady = getIsLeagueReady(activePlayers);

  async function handleStartLeague() {
    setIsLoading(true);
    try {
      await startLeague(league.id);
      showSnackbar(
        TEXT.admin.leagues.leagueHeader.startLeagueSuccess,
        SnackbarSeverity.SUCCESS
      );
      onLeagueUpdate();
    } catch {
      showSnackbar(
        TEXT.admin.leagues.leagueHeader.startLeagueError,
        SnackbarSeverity.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-4 block items-center justify-between border-b border-gray-200 pb-4 md:flex">
      <div className="flex flex-col">
        <div className="mb-4 flex items-center gap-2 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">{league.name}</h1>
          <StatusBadge status={league.status} statusMap={leagueStatusMap} />
          {league.status === LeagueStatus.InProgress && (
            <Link
              href={TEXT.admin.leagues.leagueHeader.viewLeagueLink(league.id)}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707" />
              </svg>
            </Link>
          )}
        </div>
        {league.startDate && (
          <div className="text-sm font-semibold text-gray-500">
            {formatDate(league.startDate)}
          </div>
        )}
      </div>
      {league.status === LeagueStatus.Upcoming && isLeagueReady && (
        <div className="text-right">
          <Button
            onClick={handleStartLeague}
            disabled={isLoading || !isLeagueReady}
            label={TEXT.admin.leagues.leagueHeader.startLeagueButton(isLoading)}
          />
        </div>
      )}
      {!isLeagueReady && (
        <div className="font-bold text-red-500">
          {TEXT.admin.leagues.leagueHeader.leagueStartConditions}
        </div>
      )}
    </div>
  );
}
