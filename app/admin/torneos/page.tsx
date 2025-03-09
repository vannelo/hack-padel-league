'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAllTournaments } from '@/app/actions/tournamentActions';
import AdminTablePageLayout from '@/components/Admin/Layout/AdminTablePageLayout/AdminTablePageLayout';
import TournamentCreate from '@/components/Admin/Tournament/TournamentCreate/TournamentCreate';
import TournamentTable from '@/components/Admin/Tournament/TournamentTable/TournamentTable';
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/Admin/UI/Button/Button';
import Modal from '@/components/Admin/UI/Modal/Modal';
import TableLoader from '@/components/Admin/UI/TableLoader/TableLoader';
import { TEXT } from '@/constants/text';
import { SnackbarSeverity, useSnackbar } from '@/hooks/useSnackBar';
import { Tournament } from '@/types/tournament';

export default function AdminTournaments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchTournaments = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTournaments = await getAllTournaments();
      setTournaments(fetchedTournaments as Tournament[]);
    } catch {
      showSnackbar(
        TEXT.admin.tournaments.errorFetching,
        SnackbarSeverity.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleTournamentCreation = (name: string) => {
    fetchTournaments();
    showSnackbar(
      TEXT.admin.tournaments.tournamentCreated(name),
      SnackbarSeverity.SUCCESS
    );
    setIsModalOpen(false);
  };

  return (
    <AdminTablePageLayout
      title={TEXT.admin.tournaments.tournamentsTitle}
      ctaButton={
        <Button
          label={TEXT.admin.tournaments.createTournament}
          onClick={openModal}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
        />
      }
      table={
        isLoading ? (
          <TableLoader />
        ) : (
          <TournamentTable tournaments={tournaments} />
        )
      }
      modal={
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={TEXT.admin.leagues.createLeague}
        >
          <TournamentCreate onTournamentCreated={handleTournamentCreation} />
        </Modal>
      }
    />
  );
}
