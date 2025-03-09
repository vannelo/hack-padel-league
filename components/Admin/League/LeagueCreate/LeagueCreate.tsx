'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { createLeague } from '@/app/actions/leagueActions';
import Button, { ButtonType } from '@/components/UI/Button/Button';
import { TEXT } from '@/constants/text';

import LeagueCreateFields from './LeagueCreateFields';

interface LeagueCreateProps {
  onLeagueCreated: (name: string) => void;
}

const leagueValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .required('El nombre es obligatorio.'),
});

export default function LeagueCreate({ onLeagueCreated }: LeagueCreateProps) {
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={leagueValidationSchema}
      validateOnBlur
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createLeague({ name: values.name });
          onLeagueCreated(values.name);
          resetForm();
        } catch {
          alert(TEXT.admin.leagues.errorCreating);
        } finally {
          setSubmitting(false);
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
              type={ButtonType.SUBMIT}
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
  );
}
