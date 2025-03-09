'use client';

import { Form, Formik } from 'formik';

import { createLeague } from '@/app/actions/leagueActions';
import Button, { ButtonType } from '@/components/Admin/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { leagueValidationSchema } from '@/formik/leagueValidations';

import LeagueCreateFields from './LeagueCreateFields';

interface LeagueCreateProps {
  onLeagueCreated: (name: string) => void;
}

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
