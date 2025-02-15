'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Home, Users, Trophy, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { appRoutes } from '@/constants/appRoutes'

const NavSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="left-0 top-0 z-10 hidden h-screen w-64 flex-col bg-white p-4 transition-all duration-300 md:fixed md:flex">
      <div className="h-screen rounded-lg border border-gray-200 px-4 py-8">
        <div className="mb-6 text-center">
          <Link href={appRoutes.admin.players}>
            <Image
              src="/img/hack-logo-black.png"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto mb-2"
            />
          </Link>
          <button
            className="rounded bg-gray-700 p-2 hover:bg-gray-600 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <ul className={`space-y-4 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <li>
            <Link
              href={appRoutes.admin.players}
              className={`flex items-center space-x-3 rounded p-2 font-bold transition ${
                pathname === appRoutes.admin.players
                  ? 'bg-primary'
                  : 'hover:text-slate-400'
              }`}
            >
              <Users size={20} />
              <span>Jugadores</span>
            </Link>
          </li>
          <li>
            <Link
              href={appRoutes.admin.leagues}
              className={`flex items-center space-x-3 rounded p-2 font-bold transition ${
                pathname === appRoutes.admin.leagues
                  ? 'bg-primary'
                  : 'hover:text-slate-400'
              }`}
            >
              <Home size={20} />
              <span>Ligas</span>
            </Link>
          </li>
          <li>
            <Link
              href={appRoutes.admin.tournaments}
              className={`flex items-center space-x-3 rounded p-2 font-bold transition ${
                pathname === appRoutes.admin.tournaments
                  ? 'bg-primary'
                  : 'hover:text-slate-400'
              }`}
            >
              <Trophy size={20} />
              <span>Torneos</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavSidebar
