import { useState, useEffect } from "react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";
import PlayerCreationForm from "../PlayerCreationForm/PlayerCreationForm";
import { getPlayerById } from "@/app/actions/playerActions";

interface PlayerCreationModalProps {
  open: boolean;
  onClose: () => void;
  onPlayerCreated: () => void;
  editingPlayerId: string | null;
}

export default function PlayerCreationModal({
  open,
  onClose,
  onPlayerCreated,
  editingPlayerId,
}: PlayerCreationModalProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (editingPlayerId) {
      const fetchPlayerData = async () => {
        const player = await getPlayerById(editingPlayerId);
        setPlayerData(player);
      };
      fetchPlayerData();
    } else {
      setPlayerData(null);
    }
  }, [editingPlayerId]);

  const handlePlayerCreated = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
    onPlayerCreated();
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
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-player-creation"
        aria-describedby="modal-create-new-player"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <PlayerCreationForm
            onPlayerCreated={handlePlayerCreated}
            onError={handleError}
            initialData={playerData}
          />
        </Box>
      </Modal>
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
