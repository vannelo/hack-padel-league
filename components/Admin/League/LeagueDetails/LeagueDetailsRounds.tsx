'use client'

import Link from 'next/link'

import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button'
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge'
import { APP_ROUTES } from '@/constants/appRoutes'
import { TEXT } from '@/constants/text'
import { tournamentStatusMap } from '@/constants/tournamentEnums'
import type { LeagueRound } from '@/types/league'

interface LeagueDetailsRoundsProps {
  rounds: LeagueRound[]
}

export default function LeagueDetailsRounds({
  rounds,
}: LeagueDetailsRoundsProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-4 border-b border-gray-200 text-xl font-bold text-gray-800">
        {TEXT.admin.leagues.rounds.title}
      </h4>
      {rounds && rounds.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rounds.map((round: LeagueRound) => (
            <li key={round.id} className="mb-4 border-b border-gray-200 pb-4">
              {round.tournament && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <h4 className="text-md m-0 font-bold">
                      {TEXT.admin.leagues.rounds.roundNumber(round.number)}
                    </h4>
                    <StatusBadge
                      status={round.tournament.status}
                      statusMap={tournamentStatusMap}
                    />
                  </div>
                  <div className="mb-4">
                    <Link
                      href={`${APP_ROUTES.admin.tournaments}/${round.tournament.id}`}
                    >
                      <Button
                        variant={ButtonVariant.PRIMARY}
                        label={TEXT.admin.leagues.rounds.goToTournament}
                        size={ButtonSize.SMALL}
                      />
                    </Link>
                  </div>
                  {round.couples && round.couples.length > 0 && (
                    <>
                      <h5 className="m-0 mb-1 text-sm font-bold text-gray-800">
                        {TEXT.admin.leagues.rounds.couplesTitle}
                      </h5>
                      <ul className="mb-4">
                        {round.couples.map((couple) => (
                          <li key={couple.id} className="text-sm">
                            {couple.player1.name} / {couple.player2.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {round.tournament.winnerCouples &&
                    round.tournament.winnerCouples.length > 0 && (
                      <>
                        <h5 className="m-0 text-sm font-bold text-gray-800">
                          {TEXT.admin.leagues.rounds.winnersTitle}
                        </h5>
                        {round.tournament.winnerCouples.map((couple) => (
                          <p key={couple.id} className="text-sm">
                            {couple.player1.name} / {couple.player2.name}
                          </p>
                        ))}
                      </>
                    )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-center text-sm text-gray-500">
          {TEXT.admin.leagues.rounds.noRounds}
        </p>
      )}
    </div>
  )
}
