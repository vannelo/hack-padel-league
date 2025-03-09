'use client';

import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';

import TournamentCreationForm from '../../Admin/Tournament/TournamentCreate/TournamentCreate';

interface TournamentModalProps {
  open: boolean;
  onClose: () => void;
  onTournamentCreated: () => void;
}

export default function TournamentModal({
  open,
  onClose,
  onTournamentCreated,
}: TournamentModalProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleTournamentCreated = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success',
    });
    onTournamentCreated();
    onClose();
  };

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error',
    });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crear torneo</DialogTitle>
        <DialogContent>
          <TournamentCreationForm
            onTournamentCreated={handleTournamentCreated}
            onError={handleError}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
