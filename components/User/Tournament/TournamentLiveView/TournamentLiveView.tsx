'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Tournament } from '@/types/tournament';

import {
  getTournamentActiveRound,
  getTournamentNextRound,
  getTournamentPreviousRound,
} from './utils';

interface TournamentLiveViewProps {
  tournament: Tournament;
}

export default function TournamentLiveView({
  tournament,
}: TournamentLiveViewProps) {
  const [showMatchScores, setShowMatchScores] = useState(true);
  const activeRound = getTournamentActiveRound(tournament.rounds);
  const previousRound = getTournamentPreviousRound(
    activeRound?.number ?? 0,
    tournament.rounds
  );
  const nextRound = getTournamentNextRound(
    activeRound?.number ?? 0,
    tournament.rounds
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMatchScores((prev) => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="w-1/6">
        {previousRound && (
          <div className="relative right-[-20px] z-[0] flex min-h-[40vh] items-center justify-center rounded-2xl border-2 border-gray-400 p-2 text-white">
            <div className="w-full">
              <h3 className="text-center text-sm font-bold uppercase">
                Ronda 1
              </h3>
              <div className="m-auto my-2 mb-8 flex h-[1px] w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
              <ul>
                {tournament.rounds &&
                  tournament.rounds.length > 0 &&
                  tournament.rounds[0].matches.length > 0 && (
                    <div>
                      <div className="mt-2">
                        {tournament.rounds[0].matches.map((match) => (
                          <div
                            className="mb-2 block items-center p-2 text-center text-[10px] font-bold md:mb-0 md:flex"
                            key={match.id}
                          >
                            <div className="mb-2 flex-1 text-center md:mb-0 md:text-right">
                              {match.couple1.player1.name} /{' '}
                              {match.couple1.player2.name}
                            </div>
                            <div className="mx-2 inline-block md:mb-0 md:block">
                              <div className="rounded-full p-1 text-[14px] font-bold text-primary">
                                {match.status === 'Completed' ? (
                                  `${match.couple1Score} - ${match.couple2Score}`
                                ) : (
                                  <span className="text-lg">VS</span>
                                )}
                              </div>
                            </div>
                            <div className="mb-2 flex-1 text-center md:mb-0 md:text-left">
                              {match.couple2.player1.name} /{' '}
                              {match.couple2.player2.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="w-4/6">
        <div className="relative z-[1] flex min-h-[60vh] items-center justify-center rounded-3xl border-2 !border-primary bg-black p-8 text-white">
          <AnimatePresence mode="wait">
            {showMatchScores && activeRound ? (
              <motion.div
                key="match-scores"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <h3 className="text-center text-2xl font-bold uppercase">
                  Ronda {activeRound.number}
                </h3>
                <h4 className="text-center text-sm font-bold uppercase text-primary">
                  Ronda Activa
                </h4>
                <div className="m-auto my-2 mb-8 flex h-[1px] w-32 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
                <ul>
                  <div>
                    <div className="mt-2">
                      {activeRound.matches.map((match) => (
                        <div
                          className="mb-2 block items-center p-2 text-center font-bold md:mb-0 md:flex"
                          key={match.id}
                        >
                          <div className="mb-2 flex-1 text-center text-xl md:mb-0 md:text-right">
                            {match.couple1.player1.name} /{' '}
                            {match.couple1.player2.name}
                          </div>
                          <div className="mx-4 mb-2 inline-block md:mb-0 md:block">
                            <div className="rounded-full bg-primary px-4 py-1 text-2xl font-bold text-black">
                              {match.status === 'Completed' ? (
                                `${match.couple1Score} - ${match.couple2Score}`
                              ) : (
                                <span className="text-lg">VS</span>
                              )}
                            </div>
                          </div>
                          <div className="mb-2 flex-1 text-center text-xl md:mb-0 md:text-left">
                            {match.couple2.player1.name} /{' '}
                            {match.couple2.player2.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="tournament-scores"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full px-16"
              >
                <h3 className="text-center text-2xl font-bold uppercase">
                  Tabla de Posiciones
                </h3>
                <h4 className="text-center text-sm font-bold uppercase text-primary">
                  Parejas
                </h4>
                <div className="m-auto my-2 mb-8 flex h-[1px] w-32 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
                <ul>
                  {tournament.couples.map((couple, idx) => (
                    <li
                      key={couple.id}
                      className="flex justify-between text-xl font-bold"
                    >
                      {idx + 1} - {couple.player1.name} / {couple.player2.name}
                      <strong className="text-primary">{couple.score}</strong>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-1/6">
        {nextRound && (
          <div className="relative left-[-20px] z-[0] flex min-h-[40vh] items-center justify-center rounded-2xl border-2 border-gray-400 p-2 text-white">
            <div className="w-full">
              <h3 className="text-center text-sm font-bold uppercase">
                Ronda {nextRound.number}
              </h3>
              <div className="m-auto my-2 mb-8 flex h-[1px] w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
              <ul>
                <li className="mt-2">
                  {nextRound.matches.map((match) => (
                    <div
                      className="mb-2 block items-center p-2 text-center text-[10px] font-bold md:mb-0 md:flex"
                      key={match.id}
                    >
                      <div className="mb-2 flex-1 text-center md:mb-0 md:text-right">
                        {match.couple1.player1.name} /{' '}
                        {match.couple1.player2.name}
                      </div>
                      <div className="mx-2 inline-block md:mb-0 md:block">
                        <div className="rounded-full p-1 text-[14px] font-bold text-primary">
                          {match.status === 'Completed' ? (
                            `${match.couple1Score} - ${match.couple2Score}`
                          ) : (
                            <span className="text-lg">VS</span>
                          )}
                        </div>
                      </div>
                      <div className="mb-2 flex-1 text-center md:mb-0 md:text-left">
                        {match.couple2.player1.name} /{' '}
                        {match.couple2.player2.name}
                      </div>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
