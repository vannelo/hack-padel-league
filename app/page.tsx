import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Hack Padel | Primera cancha de padel en Lindavista`,
    description: `Consulta la clasificación, jugadores y rondas de las ligas en Hack Padel.`,
  };
}

export default async function HomePage() {
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
          <h3 className="text-lg tracking-[4px] text-white">
            Primera cancha de padel en Lindavista
          </h3>
        </div>
        {/* LIGAS GRID */}
        <div className="flex justify-center items-center">
          <div className="text-center">
            <Link
              href="/ligas/"
              className="block w-full bg-primary text-black px-4 py-2 rounded-lg font-bold"
            >
              Ver Ligas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
