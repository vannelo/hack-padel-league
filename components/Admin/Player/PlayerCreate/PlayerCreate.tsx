'use client';

import { Gender, Level } from '@prisma/client';
import { Form, Formik } from 'formik';

import { createPlayer } from '@/app/actions/playerActions';
import Button, { ButtonType } from '@/components/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { playerValidationSchema } from '@/formik/playerValidations';

import PlayerCreateFields from './PlayerCreateFields';

interface PlayerCreateProps {
  onPlayerCreated: (name: string) => void;
}

export default function PlayerCreate({ onPlayerCreated }: PlayerCreateProps) {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        age: '',
        phone: '',
        gender: Gender.Male,
        level: Level.Six,
      }}
      validationSchema={playerValidationSchema}
      validateOnBlur
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createPlayer({
            ...values,
            age: values.age ? Number(values.age) : undefined,
          });
          onPlayerCreated(values.name);
        } catch {
          alert(TEXT.admin.players.errorCreating);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form className="pt-2">
          <PlayerCreateFields
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
                  ? TEXT.admin.players.submitButton.creating
                  : TEXT.admin.players.submitButton.create
              }
              className="w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
