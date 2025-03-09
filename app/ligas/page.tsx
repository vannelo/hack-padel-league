import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllLeagues } from '@/app/actions/leagueActions';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Ligas | Hack Padel`,
    description: `Consulta la clasificación, jugadores y rondas de las ligas en Hack Padel.`,
  };
}

export default async function LeaguesPage() {
  const leagues = await getAllLeagues();

  return (
    <div className="p-2">
      <h3 className="text-md mb-8 text-center tracking-[16px] text-primary md:text-lg">
        LIGAS
      </h3>
      {/* LIGAS GRID */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {leagues.map((league) => (
          <div
            key={league.id}
            className="rounded-[32px] border p-8 text-center"
          >
            <h2 className="mb-4 border-b border-primary p-2 text-2xl font-bold text-white">
              {league.name}
            </h2>
            <div className="text-center">
              <Link
                href={`/ligas/${league.id}`}
                className="block w-full rounded-lg bg-primary px-4 py-2 font-bold text-black"
              >
                Ver Liga
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
