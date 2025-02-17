'use client'

import { Box } from '@mui/material'
import { Gender, Level } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'

import {
  deletePlayer,
  getPlayerById,
  updatePlayer,
} from '@/app/actions/playerActions'
import Button from '@/components/UI/Button/Button'
import { playerValidationSchema } from '@/formik/playerValidations'

import PlayerEditFields from './PlayerEditFields'

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
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    gender: '',
    level: '',
  })

  useEffect(() => {
    if (playerId) {
      const fetchPlayerData = async () => {
        const player = await getPlayerById(playerId)
        if (!player) return
        setInitialValues({
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

  const handleDelete = async () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar a ${initialValues.name}?`
      )
    ) {
      try {
        await deletePlayer(playerId)
        onPlayerDeleted(`${initialValues.name} ha sido eliminado exitosamente.`)
      } catch {
        alert('Error al eliminar el jugador. Por favor, intenta de nuevo.')
      }
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={playerValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updatePlayer(playerId, {
              ...values,
              age: values.age ? Number(values.age) : undefined,
              gender: values.gender as Gender,
              level: values.level as Level,
            })
            onPlayerUpdated(`${values.name} ha sido actualizado exitosamente.`)
          } catch {
            alert(
              'Error al actualizar el jugador. Por favor, intenta de nuevo.'
            )
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="pt-2">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                paddingTop: 2,
                marginBottom: 1,
              }}
            >
              <PlayerEditFields values={values} handleChange={handleChange} />
              <Button
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? 'Guardando...' : 'Actualizar Jugador'}
              />
            </Box>
          </Form>
        )}
      </Formik>
      <div className="text-center">
        <button className="text-sm text-red-500" onClick={handleDelete}>
          Eliminar Jugador
        </button>
      </div>
    </>
  )
}
