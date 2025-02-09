import type { Metadata } from "next";
import { getAllLeagues } from "@/app/actions/leagueActions";
import Link from "next/link";

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
      <h3 className="text-md md:text-lg tracking-[16px] text-primary text-center mb-8">
        LIGAS
      </h3>
      {/* LIGAS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {leagues.map((league) => (
          <div
            key={league.id}
            className="border rounded-[32px] p-8 text-center"
          >
            <h2 className="text-white text-2xl font-bold border-b border-primary mb-4 p-2">
              {league.name}
            </h2>
            <div className="text-center">
              <Link
                href={`/ligas/${league.id}`}
                className="block w-full bg-primary text-black px-4 py-2 rounded-lg font-bold"
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
