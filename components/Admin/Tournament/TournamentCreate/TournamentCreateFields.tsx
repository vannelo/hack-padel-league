import { TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

interface TournamentCreateFieldsProps {
  values: {
    name: string;
    availableCourts: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched: { name?: boolean; availableCourts?: boolean };
  errors: { name?: string; availableCourts?: string };
}

export default function TournamentCreateFields({
  values,
  handleChange,
  touched,
  errors,
}: TournamentCreateFieldsProps) {
  return (
    <div className="mb-4">
      <Field
        as={TextField}
        fullWidth
        id="name"
        name="name"
        label="Nombre del Torneo"
        value={values.name}
        onChange={handleChange}
        error={touched.name && !!errors.name}
        helperText={
          touched.name && errors.name ? <ErrorMessage name="name" /> : ''
        }
      />
      <Field
        as={TextField}
        fullWidth
        id="availableCourts"
        name="availableCourts"
        label="Canchas Disponibles"
        type="number"
        value={values.availableCourts}
        onChange={handleChange}
        error={touched.availableCourts && !!errors.availableCourts}
        helperText={
          touched.availableCourts && errors.availableCourts ? (
            <ErrorMessage name="availableCourts" />
          ) : (
            ''
          )
        }
        inputProps={{ min: 1 }}
        className="mt-4"
      />
    </div>
  );
}
