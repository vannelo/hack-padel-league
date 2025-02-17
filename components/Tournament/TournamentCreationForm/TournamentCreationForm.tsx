'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

import { createTournament } from '@/app/actions/tournamentActions'

interface TournamentCreationFormProps {
  onTournamentCreated: (message: string) => void
  onError: (message: string) => void
}

export default function TournamentCreationForm({
  onTournamentCreated,
  onError,
}: TournamentCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    availableCourts: '1',
  })
  const [errors, setErrors] = useState({
    name: '',
    availableCourts: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: '', startDate: '', availableCourts: '' }

    if (formData.name.length < 2) {
      newErrors.name = 'El nombre del torneo debe tener al menos 2 caracteres.'
      isValid = false
    }

    const availableCourts = Number(formData.availableCourts)
    if (isNaN(availableCourts) || availableCourts < 1) {
      newErrors.availableCourts =
        'El número de canchas disponibles debe ser al menos 1.'
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
      await createTournament({
        name: formData.name,
        availableCourts: Number(formData.availableCourts),
      })
      onTournamentCreated(
        `Torneo "${formData.name}" ha sido añadido al sistema.`
      )
    } catch {
      onError('Error al crear el torneo. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '500px',
        margin: 'auto',
        paddingTop: 2,
      }}
    >
      <Stack spacing={2}>
        <TextField
          required
          fullWidth
          id="name"
          name="name"
          label="Nombre del Torneo"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          required
          fullWidth
          id="availableCourts"
          name="availableCourts"
          label="Canchas Disponibles"
          type="number"
          value={formData.availableCourts}
          onChange={handleInputChange}
          error={!!errors.availableCourts}
          helperText={errors.availableCourts}
          inputProps={{
            min: 1,
          }}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Creando...' : 'Crear Torneo'}
      </Button>
    </Box>
  )
}
