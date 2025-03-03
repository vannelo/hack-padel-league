'use client'

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ErrorMessage, Field } from 'formik'

import { TEXT } from '@/constants/text'
import { League } from '@/types/league'
import { Player } from '@/types/player'

interface LeaguePlayerAssignmentFieldsProps {
  values: { playerId: string }
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void
  touched: { playerId?: boolean }
  errors: { playerId?: string }
  players: Player[]
  league: League
}

export default function LeaguePlayerAssignmentFields({
  values,
  handleChange,
  touched,
  errors,
  players,
  league,
}: LeaguePlayerAssignmentFieldsProps) {
  const availablePlayers = players.filter(
    (player) => !league.players.some((lp) => lp.player.id === player.id)
  )

  return (
    <div className="mb-4">
      <FormControl fullWidth error={!!errors.playerId && touched.playerId}>
        <InputLabel id="player-select-label">
          {TEXT.admin.leagues.ranking.selectPlayerLabel}
        </InputLabel>
        <Field
          as={Select}
          labelId="player-select-label"
          id="playerId"
          name="playerId"
          value={values.playerId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{TEXT.admin.leagues.ranking.selectPlayerPlaceholder}</em>
          </MenuItem>
          {availablePlayers.length > 0 ? (
            availablePlayers.map((player) => (
              <MenuItem key={player.id} value={player.id}>
                {player.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              {TEXT.admin.leagues.ranking.noAvailablePlayers}
            </MenuItem>
          )}
        </Field>
        <ErrorMessage name="playerId" component="span" />
      </FormControl>
    </div>
  )
}
