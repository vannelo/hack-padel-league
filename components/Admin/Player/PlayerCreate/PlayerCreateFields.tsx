import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ErrorMessage, Field } from 'formik';

import { genderMap, levelMap } from '@/constants/playerEnums';

interface PlayerCreateFieldsProps {
  values: {
    name: string;
    email: string;
    age: string;
    phone: string;
    gender: string;
    level: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void;
  touched: {
    name?: boolean;
    email?: boolean;
    age?: boolean;
    phone?: boolean;
    gender?: boolean;
    level?: boolean;
  };
  errors: {
    name?: string;
    email?: string;
    age?: string;
    phone?: string;
    gender?: string;
    level?: string;
  };
}

export default function PlayerCreateFields({
  values,
  handleChange,
  touched,
  errors,
}: PlayerCreateFieldsProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Field
          as={TextField}
          fullWidth
          id="name"
          name="name"
          label="Nombre"
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
          id="email"
          name="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && !!errors.email}
          helperText={
            touched.email && errors.email ? <ErrorMessage name="email" /> : ''
          }
        />
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Field
          as={TextField}
          fullWidth
          id="age"
          name="age"
          label="Edad"
          type="number"
          value={values.age}
          onChange={handleChange}
          error={touched.age && !!errors.age}
          helperText={
            touched.age && errors.age ? <ErrorMessage name="age" /> : ''
          }
        />
        <Field
          as={TextField}
          fullWidth
          id="phone"
          name="phone"
          label="Teléfono"
          value={values.phone}
          onChange={handleChange}
          error={touched.phone && !!errors.phone}
          helperText={
            touched.phone && errors.phone ? <ErrorMessage name="phone" /> : ''
          }
        />
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <FormControl fullWidth error={touched.gender && !!errors.gender}>
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            label="Género"
          >
            {Object.entries(genderMap).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage
            name="gender"
            component="div"
            className="mt-1 text-sm text-red-500"
          />
        </FormControl>
        <FormControl fullWidth error={touched.level && !!errors.level}>
          <InputLabel id="level-label">Nivel</InputLabel>
          <Select
            labelId="level-label"
            id="level"
            name="level"
            value={values.level}
            onChange={handleChange}
            label="Nivel"
          >
            {Object.entries(levelMap).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage
            name="level"
            component="div"
            className="mt-1 text-sm text-red-500"
          />
        </FormControl>
      </div>
    </>
  );
}
