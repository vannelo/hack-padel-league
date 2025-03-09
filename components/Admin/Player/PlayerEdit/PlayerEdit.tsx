'use client';

import { Gender, Level } from '@prisma/client';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import {
  deletePlayer,
  getPlayerById,
  updatePlayer,
} from '@/app/actions/playerActions';
import Button, { ButtonType } from '@/components/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { playerValidationSchema } from '@/formik/playerValidations';

import PlayerEditFields from './PlayerEditFields';

interface PlayerEditProps {
  playerId: string;
  onPlayerUpdated: (message: string) => void;
  onPlayerDeleted: (message: string) => void;
}

export default function PlayerEdit({
  playerId,
  onPlayerUpdated,
  onPlayerDeleted,
}: PlayerEditProps) {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    gender: '',
    level: '',
  });

  useEffect(() => {
    if (playerId) {
      const fetchPlayerData = async () => {
        const player = await getPlayerById(playerId);
        if (!player) return;
        setInitialValues({
          name: player.name,
          email: player.email ?? '',
          age: player.age ? player.age.toString() : '',
          phone: player.phone ?? '',
          gender: player.gender,
          level: player.level,
        });
      };
      fetchPlayerData();
    }
  }, [playerId]);

  const handleDelete = async () => {
    if (window.confirm(TEXT.admin.players.confirmDelete(initialValues.name))) {
      try {
        await deletePlayer(playerId);
        onPlayerDeleted(TEXT.admin.players.playerDeleted(initialValues.name));
      } catch {
        alert(TEXT.admin.players.errorDeleting);
      }
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={playerValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updatePlayer(playerId, {
              ...values,
              age: values.age ? Number(values.age) : undefined,
              gender: values.gender as Gender,
              level: values.level as Level,
            });
            onPlayerUpdated(TEXT.admin.players.playerUpdated(values.name));
          } catch {
            alert(TEXT.admin.players.errorUpdating);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form className="pt-2">
            <PlayerEditFields values={values} handleChange={handleChange} />
            <div className="w-full">
              <Button
                type={ButtonType.SUBMIT}
                disabled={isSubmitting}
                label={
                  isSubmitting
                    ? TEXT.admin.players.submitButton.updating
                    : TEXT.admin.players.submitButton.update
                }
                className="w-full"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-2 text-center">
        <button className="text-sm text-red-500" onClick={handleDelete}>
          {TEXT.admin.players.submitButton.delete}
        </button>
      </div>
    </>
  );
}
