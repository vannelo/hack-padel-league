import * as Yup from 'yup';

export const leagueValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .required('El nombre es obligatorio'),
});
