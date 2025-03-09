'use client';

import { TournamentStatus, TournamentType } from '@prisma/client';
import { useState } from 'react';

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button';
import { SnackbarSeverity } from '@/hooks/useSnackBar';
import { Player } from '@/types/player';
import type { Tournament, TournamentCouple } from '@/types/tournament';

import TournamentCoupleAssignmentModal from '../TournamentCoupleAssignmentModal/TournamentCoupleAssignmentModal';

interface TournamentContentScoresProps {
  tournament: Tournament;
  players: Player[];
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  onTournamentUpdate: () => void;
}

export default function TournamentContentScores({
  tournament,
  players,
  showSnackbar,
  onTournamentUpdate,
}: TournamentContentScoresProps) {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-2 border-b border-gray-200 text-xl font-bold text-gray-800">
        PUNTAJES
      </h4>
      {tournament.status === TournamentStatus.InProgress && (
        <div className="mb-4 mt-2 flex justify-between">
          <h4 className="m-0 text-sm font-bold text-gray-800">Jugador</h4>
          <h4 className="m-0 text-sm font-bold text-gray-800">Puntos</h4>
        </div>
      )}
      {tournament.status === TournamentStatus.Upcoming &&
        tournament.type !== TournamentType.League && (
          <div className="mb-4 mt-4">
            <Button
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.SMALL}
              onClick={() => setIsAddingPlayer(true)}
              label="Agregar Jugador"
            />
          </div>
        )}
      {tournament.couples.length > 0 ? (
        <ul>
          {tournament.couples.map((couple: TournamentCouple) => (
            <li key={couple.id} className="flex justify-between">
              <p className="text-sm">
                {couple.player1.name} y {couple.player2.name}
              </p>
              <p>
                <strong>{couple.score}</strong>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          No hay jugadores asignados a esta torneo.
        </p>
      )}
      {isAddingPlayer && (
        <TournamentCoupleAssignmentModal
          tournament={tournament}
          players={players}
          open={isAddingPlayer}
          onClose={() => setIsAddingPlayer(false)}
          showSnackbar={showSnackbar}
          onTournamentUpdate={onTournamentUpdate}
        />
      )}
    </div>
  );
}
