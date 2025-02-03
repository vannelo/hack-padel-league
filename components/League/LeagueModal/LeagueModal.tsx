"use client";

import { useState } from "react";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import LeagueCreationForm from "../LeagueCreationForm/LeagueCreationForm";

interface LeagueModalProps {
  open: boolean;
  onClose: () => void;
  onLeagueCreated: () => void;
}

export default function LeagueModal({
  open,
  onClose,
  onLeagueCreated,
}: LeagueModalProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleLeagueCreated = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
    onLeagueCreated();
    onClose();
  };

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crear liga</DialogTitle>
        <DialogContent>
          <LeagueCreationForm
            onLeagueCreated={handleLeagueCreated}
            onError={handleError}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
