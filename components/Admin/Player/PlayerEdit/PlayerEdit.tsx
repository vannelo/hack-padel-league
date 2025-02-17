'use client'

import { useState, useEffect } from 'react'
import { Gender, Level } from '@prisma/client'
import {
  deletePlayer,
  getPlayerById,
  updatePlayer,
} from '@/app/actions/playerActions'
import { genderMap, levelMap } from '@/constants/playerEnums'
import {
  TextField,
  Select,
  type SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
} from '@mui/material'
import Button from '@/components/UI/Button/Button'

interface PlayerEditProps {
  playerId: string
  onPlayerUpdated: (message: string) => void
  onPlayerDeleted: (message: string) => void
}

export default function PlayerEdit({
  playerId,
  onPlayerUpdated,
  onPlayerDeleted,
}: PlayerEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: '',
    phone: '',
    gender: Gender.Male as Gender,
    level: Level.Six as Level,
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
  })

  useEffect(() => {
    if (playerId) {
      const fetchPlayerData = async () => {
        const player = await getPlayerById(playerId)
        setFormData({
          id: playerId,
          name: player.name,
          email: player.email ?? '',
          age: player.age ? player.age.toString() : '',
          phone: player.phone ?? '',
          gender: player.gender,
          level: player.level,
        })
      }

      fetchPlayerData()
    }
  }, [playerId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name as string]: value }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: '', email: '', age: '', phone: '' }

    if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const playerId = formData.id
      const playerData = {
        ...formData,
        age: Number.parseInt(formData.age, 10),
      }

      await updatePlayer(playerId, playerData)
      onPlayerUpdated(`${formData.name} ha sido actualizado exitosamente.`)
    } catch {
      alert('Error al actualizar el jugador. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar a ${formData.name}?`
      )
    ) {
      try {
        await deletePlayer(playerId)
        onPlayerDeleted(`${formData.name} ha sido eliminado exitosamente.`)
      } catch {
        alert('Error al eliminar el jugador. Por favor, intenta de nuevo.')
      }
    }
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingTop: 2,
          marginBottom: 1,
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mb: 2 }}
        >
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Stack>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mb: 2 }}
        >
          <TextField
            fullWidth
            id="age"
            name="age"
            label="Edad"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Stack>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ mb: 2 }}
        >
          <FormControl fullWidth>
            <InputLabel id="gender-label">Género</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
              label="Género"
            >
              {Object.entries(genderMap).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleSelectChange}
              label="Level"
            >
              {Object.entries(levelMap).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          disabled={isSubmitting}
          label={isSubmitting ? 'Guardando...' : 'Actualizar Jugador'}
        />
      </Box>
      <div className="text-center">
        <button className="text-sm text-red-500" onClick={handleDelete}>
          Eliminar Jugador
        </button>
      </div>
    </>
  )
}
