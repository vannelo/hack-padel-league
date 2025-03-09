'use client';

import { TextField } from '@mui/material';
import { LeagueStatus } from '@prisma/client';
import { Pencil, X } from 'lucide-react';
import { useCallback, useState } from 'react';

import { updatePlayerScore } from '@/app/actions/leagueActions';
import LeaguePlayerAssignment from '@/components/Admin/League/LeaguePlayerAssignment/LeaguePlayerAssignment';
import { getSortedLeaguePlayers } from '@/components/Admin/League/utils';
import Modal from '@/components/Admin/UI/Modal/Modal';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { SnackbarSeverity, useSnackbar } from '@/hooks/useSnackBar';
import { League, LeaguePlayer } from '@/types/league';
import { Player } from '@/types/player';

interface LeagueDetailsRankingProps {
  league: League;
  players: Player[];
  onLeagueUpdate: () => void;
}

export default function LeagueDetailsRanking({
  league,
  players,
  onLeagueUpdate,
}: LeagueDetailsRankingProps) {
  const { showSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scoreEdits, setScoreEdits] = useState<{ [key: string]: number }>({});
  const [editingPlayers, setEditingPlayers] = useState<{
    [key: string]: boolean;
  }>({});
  const [loadingPlayers, setLoadingPlayers] = useState<{
    [key: string]: boolean;
  }>({});
  const sortedPlayers = getSortedLeaguePlayers(league.players);

  const handleScoreChange = (playerId: string, value: string) => {
    const score = value === '' ? 0 : Math.max(0, Number.parseInt(value, 10));
    setScoreEdits((prev) => ({ ...prev, [playerId]: score }));
  };

  const handleEditClick = (playerId: string, currentScore: number) => {
    setEditingPlayers((prev) => ({ ...prev, [playerId]: true }));
    setScoreEdits((prev) => ({ ...prev, [playerId]: currentScore }));
  };

  const handleCancelEdit = (playerId: string) => {
    setEditingPlayers((prev) => ({ ...prev, [playerId]: false }));
  };

  const handleSaveScore = useCallback(
    async (playerId: string) => {
      setLoadingPlayers((prev) => ({ ...prev, [playerId]: true }));

      try {
        await updatePlayerScore(playerId, scoreEdits[playerId]);
        showSnackbar(
          TEXT.admin.leagues.ranking.updateScoreSuccess,
          SnackbarSeverity.SUCCESS
        );
        onLeagueUpdate();
        setEditingPlayers((prev) => ({ ...prev, [playerId]: false }));
      } catch {
        showSnackbar(
          TEXT.admin.leagues.ranking.updateScoreError,
          SnackbarSeverity.ERROR
        );
      } finally {
        setLoadingPlayers((prev) => ({ ...prev, [playerId]: false }));
      }
    },
    [scoreEdits, showSnackbar, onLeagueUpdate]
  );

  const handlePlayerAdded = useCallback(() => {
    showSnackbar(
      TEXT.admin.leagues.ranking.playerAdded,
      SnackbarSeverity.SUCCESS
    );
    onLeagueUpdate();
    setIsModalOpen(false);
  }, [showSnackbar, onLeagueUpdate]);

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-2 border-b border-gray-200 text-xl font-bold text-gray-800">
        {TEXT.admin.leagues.ranking.title}
      </h4>
      <div className="mb-4 flex justify-between">
        <h4 className="m-0 text-sm font-bold text-gray-800">
          {TEXT.admin.leagues.ranking.playerHeader}
        </h4>
        <h4 className="m-0 text-sm font-bold text-gray-800">
          {TEXT.admin.leagues.ranking.pointsHeader}
        </h4>
      </div>
      {league.status === LeagueStatus.Upcoming && (
        <div className="mb-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant={ButtonVariant.PRIMARY}
            label={TEXT.admin.leagues.addPlayer}
            className="w-full"
          />
        </div>
      )}
      {sortedPlayers.length > 0 ? (
        <ul>
          {sortedPlayers.map((player: LeaguePlayer, idx: number) => (
            <li
              key={player.id}
              className="mb-2 flex items-center justify-between"
            >
              <p>
                {idx + 1} - {player.player.name}
              </p>
              {league.status === LeagueStatus.InProgress && (
                <div className="flex items-center gap-2">
                  {editingPlayers[player.id] ? (
                    <>
                      <TextField
                        type="number"
                        value={scoreEdits[player.id] ?? player.points}
                        onChange={(e) =>
                          handleScoreChange(player.id, e.target.value)
                        }
                        disabled={loadingPlayers[player.id]}
                        size="small"
                        sx={{ width: 60 }}
                      />
                      <Button
                        onClick={() => handleSaveScore(player.id)}
                        disabled={loadingPlayers[player.id]}
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.SMALL}
                        label={TEXT.admin.leagues.ranking.saveButton(
                          loadingPlayers[player.id]
                        )}
                      />
                      <button onClick={() => handleCancelEdit(player.id)}>
                        <X size={20} color="red" />
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-bold">{player.points}</p>
                      <button
                        onClick={() =>
                          handleEditClick(player.id, player.points)
                        }
                      >
                        <Pencil size={16} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          {TEXT.admin.leagues.ranking.noPlayersAssigned}
        </p>
      )}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={TEXT.admin.leagues.createLeague}
        >
          <LeaguePlayerAssignment
            league={league}
            players={players}
            onPlayerAdded={handlePlayerAdded}
          />
        </Modal>
      )}
    </div>
  );
}
