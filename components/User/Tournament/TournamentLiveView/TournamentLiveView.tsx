'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Tournament } from '@/types/tournament';

interface TournamentLiveViewProps {
  tournament: Tournament;
}

export default function TournamentLiveView({
  tournament,
}: TournamentLiveViewProps) {
  const [showMatchScores, setShowMatchScores] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMatchScores((prev) => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="w-4/6">
        <div className="relative z-[1] flex min-h-[60vh] items-center justify-center rounded-3xl border-2 !border-primary bg-black p-8 text-white">
          <AnimatePresence mode="wait">
            {showMatchScores ? (
              <motion.div
                key="match-scores"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <h3 className="text-center text-2xl font-bold uppercase">
                  Ronda 2
                </h3>
                <h4 className="text-center text-sm font-bold uppercase text-primary">
                  Ronda Activa
                </h4>
                <div className="m-auto my-2 mb-8 flex h-[1px] w-32 items-center justify-center rounded-full bg-primary text-xl font-bold text-white" />
                <ul>
                  {tournament.rounds &&
                    tournament.rounds.length > 0 &&
                    tournament.rounds[1]?.matches.length > 0 && (
                      <div>
                        <div className="mt-2">
                          {tournament.rounds[1].matches.map((match) => (
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
                    )}
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
    </div>
  );
}
