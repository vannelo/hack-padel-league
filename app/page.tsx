import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Hack Padel | Primera cancha de padel en Lindavista`,
    description: `Consulta la clasificación, jugadores y rondas de las ligas en Hack Padel.`,
  }
}

export default async function HomePage() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            <Image
              src="/img/hack-logo.png"
              width={160}
              height={160}
              alt="Hack Padel Logo"
              className="mx-auto mb-4"
            />
          </Link>
          <h3 className="text-center text-lg font-bold uppercase text-white">
            Primera cancha de padel en Lindavista
          </h3>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Link
              href="/ligas/"
              className="mb-4 text-2xl font-bold text-primary hover:underline"
            >
              Ver Ligas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
