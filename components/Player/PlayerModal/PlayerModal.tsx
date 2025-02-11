import { useState, useEffect } from 'react'
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import PlayerCreationForm from '../PlayerCreationForm/PlayerCreationForm'
import PlayerEditForm from '../PlayerEditForm/PlayerEditForm'
import { getPlayerById } from '@/app/actions/playerActions'
import { Player } from '@/types/player'

interface PlayerModalProps {
  open: boolean
  onClose: () => void
  onPlayerCreated: () => void
  editingPlayerId: string | null
}

export default function PlayerModal({
  open,
  onClose,
  onPlayerCreated,
  editingPlayerId,
}: PlayerModalProps) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [playerData, setPlayerData] = useState<Player | null>(null)

  useEffect(() => {
    if (editingPlayerId) {
      const fetchPlayerData = async () => {
        const player = await getPlayerById(editingPlayerId)
        setPlayerData(player)
      }
      fetchPlayerData()
    } else {
      setPlayerData(null)
    }
  }, [editingPlayerId])

  const handlePlayerCreated = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success',
    })
    onPlayerCreated()
    onClose()
  }

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error',
    })
  }

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {editingPlayerId ? 'Editar jugador' : 'Crear jugador'}
        </DialogTitle>
        <DialogContent>
          {editingPlayerId && playerData ? (
            <PlayerEditForm
              onPlayerUpdated={handlePlayerCreated}
              onError={handleError}
              initialData={playerData}
            />
          ) : (
            <PlayerCreationForm
              onPlayerCreated={handlePlayerCreated}
              onError={handleError}
            />
          )}
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
  )
}
