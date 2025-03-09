'use client';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useState } from 'react';

import { addCoupleToTournament } from '@/app/actions/tournamentActions';
import { SnackbarSeverity } from '@/hooks/useSnackBar';
import type { Player } from '@/types/player';
import type { Tournament } from '@/types/tournament';

interface TournamentCoupleAssignmentModalProps {
  tournament: Tournament;
  players: Player[];
  open: boolean;
  onClose: () => void;
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  onTournamentUpdate: () => void;
}

export default function TournamentCoupleAssignmentModal({
  tournament,
  players,
  open,
  onClose,
  showSnackbar,
  onTournamentUpdate,
}: TournamentCoupleAssignmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    player1Id: '',
    player2Id: '',
  });
  const [errors, setErrors] = useState({
    player1Id: '',
    player2Id: '',
  });

  const handleInputChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const getAvailablePlayers = () => {
    const playersInCouples = new Set(
      tournament.couples.flatMap((couple) => [
        couple.player1Id,
        couple.player2Id,
      ])
    );

    return players.filter((player) => !playersInCouples.has(player.id));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { player1Id: '', player2Id: '' };

    if (!formData.player1Id) {
      newErrors.player1Id = 'Por favor, seleccione el primer jugador.';
      isValid = false;
    }

    if (!formData.player2Id) {
      newErrors.player2Id = 'Por favor, seleccione el segundo jugador.';
      isValid = false;
    }

    if (formData.player1Id === formData.player2Id) {
      newErrors.player2Id = 'Los dos jugadores deben ser diferentes.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await addCoupleToTournament(tournament.id, formData);
      showSnackbar('Pareja añadida correctamente', SnackbarSeverity.SUCCESS);
      onTournamentUpdate();
      onClose();
    } catch {
      showSnackbar('Error al añadir pareja', SnackbarSeverity.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availablePlayers = getAvailablePlayers();

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Añadir Pareja al Torneo</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pt: 2,
            }}
          >
            <Stack spacing={2}>
              <FormControl fullWidth error={!!errors.player1Id}>
                <InputLabel id="player1-select-label">Jugador 1</InputLabel>
                <Select
                  labelId="player1-select-label"
                  id="player1Id"
                  name="player1Id"
                  value={formData.player1Id}
                  label="Jugador 1"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>-- Seleccione Jugador 1 --</em>
                  </MenuItem>
                  {availablePlayers.map((player) => (
                    <MenuItem key={player.id} value={player.id}>
                      {player.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.player1Id && (
                  <Box
                    component="span"
                    sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}
                  >
                    {errors.player1Id}
                  </Box>
                )}
              </FormControl>
              <FormControl fullWidth error={!!errors.player2Id}>
                <InputLabel id="player2-select-label">Jugador 2</InputLabel>
                <Select
                  labelId="player2-select-label"
                  id="player2Id"
                  name="player2Id"
                  value={formData.player2Id}
                  label="Jugador 2"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>-- Seleccione Jugador 2 --</em>
                  </MenuItem>
                  {availablePlayers
                    .filter((player) => player.id !== formData.player1Id)
                    .map((player) => (
                      <MenuItem key={player.id} value={player.id}>
                        {player.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.player2Id && (
                  <Box
                    component="span"
                    sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}
                  >
                    {errors.player2Id}
                  </Box>
                )}
              </FormControl>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Añadiendo...' : 'Añadir Pareja al Torneo'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
