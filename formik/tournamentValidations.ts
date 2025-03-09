import * as Yup from 'yup';

export const tournamentValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre del torneo debe tener al menos 2 caracteres.')
    .required('El nombre es obligatorio.'),
  availableCourts: Yup.number()
    .min(1, 'El número de canchas disponibles debe ser al menos 1.')
    .required('Este campo es obligatorio.')
    .integer('Debe ser un número entero'),
});
