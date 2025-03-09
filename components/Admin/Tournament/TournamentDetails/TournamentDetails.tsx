'use client';

import { notFound } from 'next/navigation';
import { useCallback } from 'react';

import { useSnackbar } from '@/hooks/useSnackBar';
import { useTournament } from '@/hooks/useTournament';
import type { Player } from '@/types/player';
import type { Tournament } from '@/types/tournament';

import TableLoader from '../../UI/TableLoader/TableLoader';
import TournamentDetailsHeader from './TournamentDetailsHeader';
import TournamentDetailsRounds from './TournamentDetailsRounds';
import TournamentDetailsScores from './TournamentDetailsScores';

interface TournamentDetailsProps {
  initialTournament: Tournament;
  players: Player[];
}

export default function TournamentDetails({
  initialTournament,
  players,
}: TournamentDetailsProps) {
  const { showSnackbar } = useSnackbar();
  const { tournament, isLoading, fetchTournament } =
    useTournament(initialTournament);

  const handleTournamentUpdate = useCallback(() => {
    fetchTournament();
  }, [fetchTournament]);

  if (!tournament) {
    notFound();
  }

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <div className="container mx-auto py-16">
      <TournamentDetailsHeader
        tournament={tournament}
        showSnackbar={showSnackbar}
        onTournamentUpdate={handleTournamentUpdate}
      />
      <div className="block gap-8 md:flex">
        <div className="mb-4 w-full md:w-2/6">
          <TournamentDetailsScores
            tournament={tournament}
            players={players}
            showSnackbar={showSnackbar}
            onTournamentUpdate={handleTournamentUpdate}
          />
        </div>
        <div className="w-full md:w-4/6">
          <TournamentDetailsRounds
            tournament={tournament}
            showSnackbar={showSnackbar}
            onTournamentUpdate={handleTournamentUpdate}
          />
        </div>
      </div>
    </div>
  );
}
