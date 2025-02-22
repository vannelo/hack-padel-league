import { TextField } from '@mui/material'
import { ErrorMessage, Field } from 'formik'

interface LeagueCreateFieldsProps {
  values: {
    name: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  touched: { name?: boolean }
  errors: { name?: string }
}

export default function LeagueCreateFields({
  values,
  handleChange,
  touched,
  errors,
}: LeagueCreateFieldsProps) {
  return (
    <div className="mb-4">
      <Field
        as={TextField}
        fullWidth
        id="name"
        name="name"
        label="Nombre de la Liga"
        value={values.name}
        onChange={handleChange}
        error={touched.name && !!errors.name}
        helperText={
          touched.name && errors.name ? <ErrorMessage name="name" /> : ''
        }
      />
    </div>
  )
}
