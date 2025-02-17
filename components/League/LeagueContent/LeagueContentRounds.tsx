'use client'

import Link from 'next/link'

import Button from '@/components/UI/Button/Button'
import StatusBadge from '@/components/UI/StatusBadge/StatusBadge'
import { tournamentStatusMap } from '@/constants/tournamentEnums'
import type { LeagueRound } from '@/types/league'

interface LeagueContentRoundsProps {
  rounds: LeagueRound[]
}

export default function LeagueContentRounds({
  rounds,
}: LeagueContentRoundsProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="m-0 mb-4 border-b border-gray-200 text-xl font-bold text-gray-800">
        JORNADAS
      </h4>
      {rounds && rounds.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rounds.map((round: LeagueRound) => (
            <li key={round.id} className="mb-4 border-b border-gray-200 pb-4">
              {round.tournament && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <h4 className="text-md m-0 font-bold">
                      Jornada {round.number}
                    </h4>
                    <StatusBadge
                      status={round.tournament.status}
                      statusMap={tournamentStatusMap}
                    />
                  </div>
                  <div className="mb-4">
                    <Link href={`/admin/torneos/${round.tournament.id}`}>
                      <Button
                        variant="primary"
                        label="Ir al torneo"
                        size="small"
                      />
                    </Link>
                  </div>
                  {round.couples && round.couples.length > 0 && (
                    <>
                      <h5 className="m-0 mb-1 text-sm font-bold text-gray-800">
                        Parejas
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
                          Ganadores
                        </h5>
                        {round.tournament.winnerCouples.map((couple, index) => (
                          <p key={couple.id} className="text-sm">
                            {couple.player1.name} / {couple.player2.name}
                            {index <
                            (round.tournament?.winnerCouples.length ?? 0) -
                              1 ? (
                              <br></br>
                            ) : (
                              ''
                            )}
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
          Las jornadas serán creadas una vez que se haya iniciado la liga.
        </p>
      )}
    </div>
  )
}
