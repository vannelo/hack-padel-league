import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { ErrorMessage, Field } from 'formik'

import { genderMap, levelMap } from '@/constants/playerEnums'

interface PlayerEditFieldsProps {
  values: {
    gender: string
    level: string
  }
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => void
}

export default function PlayerEditFields({
  values,
  handleChange,
}: PlayerEditFieldsProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Field as={TextField} fullWidth id="name" name="name" label="Nombre" />
        <Field
          as={TextField}
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
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
        />
        <Field
          as={TextField}
          fullWidth
          id="phone"
          name="phone"
          label="Teléfono"
        />
      </div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <FormControl fullWidth>
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
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
        <FormControl fullWidth>
          <InputLabel id="level-label">Nivel</InputLabel>
          <Select
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
  )
}
