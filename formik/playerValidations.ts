import * as Yup from 'yup'

export const playerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .required('El nombre es obligatorio'),
  email: Yup.string().email('Email inválido').optional(),
  age: Yup.number()
    .typeError('Debe ser un número')
    .min(10, 'Edad mínima de 10 años')
    .max(100, 'Edad máxima de 100 años'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Debe contener solo números')
    .optional(),
  gender: Yup.string(),
  level: Yup.string(),
})
