'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Tournament } from '@/types/tournament';

import {
  getIsAllRoundsCompleted,
  getTournamentActiveRound,
  getTournamentNextRound,
  getTournamentPreviousRound,
  getTournamentWinners,
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
  const nextRound = activeRound
    ? getTournamentNextRound(activeRound.number, tournament.rounds)
    : null;
  const isAllRoundsCompleted = getIsAllRoundsCompleted(tournament.rounds);
  const winners =
    isAllRoundsCompleted && getTournamentWinners(tournament.couples);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMatchScores((prev) => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[100vh] items-center justify-center px-8 py-24 md:px-0 md:py-0">
      <div className="hidden w-1/6 md:block">
        {previousRound && (
          <div className="relative right-[-20px] z-[0] flex min-h-[40vh] items-center justify-center rounded-2xl border-2 border-gray-400 p-2 text-white">
            <div className="w-full">
              <h3 className="text-center text-sm font-bold uppercase">
                Ronda {previousRound.number}
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
      <div className="w-full md:w-4/6">
        <div className="relative z-[1] flex min-h-[60vh] items-center justify-center rounded-3xl border-2 !border-primary bg-black p-4 text-white md:p-8">
          <AnimatePresence mode="wait">
            {showMatchScores && activeRound ? (
              <motion.div
                key="match-scores"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full px-2 md:px-16"
              >
                <h3 className="text-center text-sm font-bold uppercase md:text-2xl">
                  {tournament.name}
                </h3>
                <h4 className="text-center text-sm font-bold uppercase text-primary">
                  Ronda {activeRound.number}
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
                          <div className="mb-2 flex-1 text-center text-sm md:mb-0 md:text-right md:text-xl">
                            {match.couple1.player1.name} /{' '}
                            {match.couple1.player2.name}
                          </div>
                          <div className="mx-4 mb-2 inline-block md:mb-0 md:block">
                            <div className="rounded-full bg-primary px-4 py-1 text-2xl font-bold text-black">
                              {match.status === 'Completed' ? (
                                `${match.couple1Score} - ${match.couple2Score}`
                              ) : (
                                <span className="text-base md:text-lg">VS</span>
                              )}
                            </div>
                          </div>
                          <div className="mb-2 flex-1 text-center text-sm md:mb-0 md:text-left md:text-xl">
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
                className="w-full px-2 md:px-16"
              >
                {winners && (
                  <>
                    <h2 className="text-center text-sm font-bold uppercase md:text-lg">
                      Ganadores
                    </h2>
                    <div className="flex w-full flex-col items-center justify-center">
                      {winners.map((couple) => (
                        <motion.div
                          key={couple.id}
                          className="relative mb-2 text-xl font-bold md:text-3xl"
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            color: '#c0ff00',
                            overflow: 'hidden',
                            textAlign: 'center',
                          }}
                        >
                          {couple.player1.name} / {couple.player2.name}
                          <motion.div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background:
                                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                              mixBlendMode: 'overlay',
                            }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
                <h3 className="mt-4 text-center text-sm font-bold uppercase md:text-2xl">
                  {tournament.name}
                </h3>
                <h4 className="text-center text-sm font-bold uppercase text-primary">
                  Tabla de posiciones
                </h4>
                <div className="m-auto my-2 mb-8 flex h-[1px] w-32 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
                <ul>
                  {tournament.couples.map((couple, idx) => (
                    <li
                      key={couple.id}
                      className="flex justify-between text-sm font-bold md:text-xl"
                    >
                      {idx + 1} - {couple.player1.name} / {couple.player2.name}
                      <strong className="ml-4 text-lg text-primary md:ml-2">
                        {couple.score}
                      </strong>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden w-1/6 md:block">
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
