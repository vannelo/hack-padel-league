'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { addPlayerToLeague } from '@/app/actions/leagueActions';
import Button, { ButtonType } from '@/components/Admin/UI/Button/Button';
import { TEXT } from '@/constants/text';
import { League } from '@/types/league';
import type { Player } from '@/types/player';

import LeaguePlayerAssignmentFields from './LeaguePlayerAssignmentFields';

interface LeaguePlayerAssignmentProps {
  league: League;
  players: Player[];
  onPlayerAdded: () => void;
}

const playerAssignmentSchema = Yup.object({
  playerId: Yup.string().required(TEXT.admin.leagues.ranking.selectPlayerError),
});

export default function LeaguePlayerAssignment({
  league,
  players,
  onPlayerAdded,
}: LeaguePlayerAssignmentProps) {
  return (
    <Formik
      initialValues={{ playerId: '' }}
      validationSchema={playerAssignmentSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addPlayerToLeague({
            leagueId: league.id,
            playerId: values.playerId,
          });
          onPlayerAdded();
          resetForm();
        } catch {
          alert(TEXT.admin.leagues.ranking.playerAddError);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form className="pt-2">
          <LeaguePlayerAssignmentFields
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            players={players}
            league={league}
          />
          <Button
            type={ButtonType.SUBMIT}
            disabled={isSubmitting}
            label={
              isSubmitting
                ? TEXT.admin.leagues.ranking.addingPlayer
                : TEXT.admin.leagues.ranking.addPlayer
            }
            className="w-full"
          />
        </Form>
      )}
    </Formik>
  );
}
