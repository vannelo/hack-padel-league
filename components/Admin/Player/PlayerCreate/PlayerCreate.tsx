'use client'

import { Gender, Level } from '@prisma/client'
import { Form, Formik } from 'formik'

import { createPlayer } from '@/app/actions/playerActions'
import Button from '@/components/UI/Button/Button'
import { playerValidationSchema } from '@/formik/playerValidations'

import PlayerCreateFields from './PlayerCreateFields'

interface PlayerCreateProps {
  onPlayerCreated: (message: string) => void
}

export default function PlayerCreate({ onPlayerCreated }: PlayerCreateProps) {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        age: '',
        phone: '',
        gender: Gender.Male,
        level: Level.Six,
      }}
      validationSchema={playerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createPlayer({
            ...values,
            age: values.age ? Number(values.age) : undefined,
          })
          onPlayerCreated(`${values.name} ha sido añadido al sistema.`)
        } catch {
          alert('Error al crear jugador')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, handleChange, values }) => (
        <Form className="pt-2">
          <PlayerCreateFields values={values} handleChange={handleChange} />
          <div className="w-full">
            <Button
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? 'Guardando...' : 'Crear Jugador'}
              className="w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
