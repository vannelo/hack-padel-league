'use client'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { createLeague } from '@/app/actions/leagueActions'
import Button from '@/components/UI/Button/Button'
import { TEXT } from '@/constants/text'

import LeagueCreateFields from './LeagueCreateFields'

interface LeagueCreateProps {
  onLeagueCreated: (name: string) => void // Accepts only the name
}

const leagueValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .required('El nombre es obligatorio.'),
})

export default function LeagueCreate({ onLeagueCreated }: LeagueCreateProps) {
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={leagueValidationSchema}
      validateOnBlur
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createLeague({ name: values.name })
          onLeagueCreated(values.name) // Pass only the name, not the whole message
          resetForm()
        } catch {
          alert(TEXT.admin.leagues.errorCreating)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form className="pt-2">
          <LeagueCreateFields
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />
          <div className="w-full">
            <Button
              type="submit"
              disabled={isSubmitting}
              label={
                isSubmitting
                  ? TEXT.admin.leagues.submitButton.saving
                  : TEXT.admin.leagues.submitButton.create
              }
              className="w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
