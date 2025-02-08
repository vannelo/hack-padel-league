import type { Metadata } from "next";
import { getAllLeagues } from "@/app/actions/leagueActions";
import Image from "next/image";
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
    <div className="bg-black text-white min-h-[100vh]">
      <div className="container mx-auto py-16 px-8">
        {/* HEADER */}
        <div className="flex flex-col justify-center items-center mb-8">
          <Link href="/" className="text-primary font-bold text-2xl">
            <Image
              src="/img/hack-logo.png"
              width={160}
              height={160}
              alt="Hack Padel Logo"
              className="mx-auto mb-4"
            />
          </Link>
          <h3 className="text-lg tracking-[16px] text-primary">LIGAS</h3>
        </div>
        {/* LIGAS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    </div>
  );
}
