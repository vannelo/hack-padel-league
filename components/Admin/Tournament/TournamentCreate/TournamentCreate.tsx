'use client';

import { Form, Formik } from 'formik';

import { createTournament } from '@/app/actions/tournamentActions';
import Button, { ButtonType } from '@/components/Admin/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { tournamentValidationSchema } from '@/formik/tournamentValidations';

import TournamentCreateFields from './TournamentCreateFields';

interface TournamentCreateProps {
  onTournamentCreated: (message: string) => void;
}

export default function TournamentCreate({
  onTournamentCreated,
}: TournamentCreateProps) {
  return (
    <Formik
      initialValues={{ name: '', availableCourts: '1' }}
      validationSchema={tournamentValidationSchema}
      validateOnBlur
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createTournament({
            name: values.name,
            availableCourts: Number(values.availableCourts),
          });
          onTournamentCreated(values.name);
          resetForm();
        } catch {
          alert(TEXT.admin.tournaments.errorCreating);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form className="pt-2">
          <TournamentCreateFields
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
                  ? TEXT.admin.tournaments.submitButton.saving
                  : TEXT.admin.tournaments.submitButton.create
              }
              className="w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
