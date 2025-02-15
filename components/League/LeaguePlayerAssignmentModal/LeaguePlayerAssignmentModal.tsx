'use client'

import { useState, useMemo } from 'react'
import { addPlayerToLeague } from '@/app/actions/leagueActions'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import type { Player } from '@/types/player'
import { League } from '@/types/league'
import Button from '@/components/UI/Button/Button'

interface LeaguePlayerAssignmentModalProps {
  league: League
  players: Player[]
  open: boolean
  onClose: () => void
  showSnackbar: (message: string, severity: 'success' | 'error') => void
  onLeagueUpdate: () => void
}

export default function LeaguePlayerAssignmentModal({
  league,
  players,
  open,
  onClose,
  showSnackbar,
  onLeagueUpdate,
}: LeaguePlayerAssignmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [playerId, setPlayerId] = useState('')
  const [error, setError] = useState('')

  const availablePlayers = useMemo(() => {
    return players.filter(
      (player) => !league.players.some((lp) => lp.player.id === player.id)
    )
  }, [players, league.players])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setPlayerId(event.target.value)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerId) {
      setError('Por favor, seleccione un jugador.')
      return
    }

    setIsSubmitting(true)
    try {
      await addPlayerToLeague({ leagueId: league.id, playerId, points: 0 })
      showSnackbar('Jugador añadido a la liga correctamente', 'success')
      onLeagueUpdate()
      onClose()
    } catch {
      showSnackbar('Error al añadir jugador a la liga', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Añadir Jugador a la Liga
      </DialogTitle>
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
          <FormControl fullWidth error={!!error}>
            <InputLabel id="player-select-label">Jugador</InputLabel>
            <Select
              labelId="player-select-label"
              id="playerId"
              name="playerId"
              value={playerId}
              label="Jugador"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>-- Selecciona un Jugador --</em>
              </MenuItem>
              {availablePlayers.length > 0 ? (
                availablePlayers.map((player) => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value="">
                  No hay jugadores disponibles
                </MenuItem>
              )}
            </Select>
            {error && (
              <Box
                component="span"
                sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}
              >
                {error}
              </Box>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || availablePlayers.length === 0}
            label={isSubmitting ? 'Añadiendo...' : 'Añadir Jugador a la Liga'}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
