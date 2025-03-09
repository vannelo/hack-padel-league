import { Gender, Level } from '@prisma/client';

export const levelMap = {
  [Level.One]: 'Primera',
  [Level.Two]: 'Segunda',
  [Level.Three]: 'Tercera',
  [Level.Four]: 'Cuarta',
  [Level.Five]: 'Quinta',
  [Level.Six]: 'Sexta',
};

export const genderMap = {
  [Gender.Male]: 'Masculino',
  [Gender.Female]: 'Femenino',
};
