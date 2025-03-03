'use client'

import { Home, Menu, Trophy, Users, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { APP_ROUTES } from '@/constants/appRoutes'

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 z-20 block w-full bg-white md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={APP_ROUTES.admin.players} className="flex items-center">
          <Image
            src="/img/hack-logo-black.png"
            alt="Logo"
            width={100}
            height={50}
            className="h-auto w-auto"
          />
        </Link>
        <button
          className="rounded p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div
        className={`left-0 top-full w-full bg-white shadow-md transition-transform duration-300 ${
          isOpen ? 'absolute' : 'hidden'
        }`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <Link
              href={APP_ROUTES.admin.players}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 font-semibold transition ${
                pathname === APP_ROUTES.admin.players
                  ? 'bg-primary text-black'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Users size={20} />
              <span>Jugadores</span>
            </Link>
          </li>
          <li>
            <Link
              href={APP_ROUTES.admin.leagues}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 font-semibold transition ${
                pathname === APP_ROUTES.admin.leagues
                  ? 'bg-primary text-black'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Ligas</span>
            </Link>
          </li>
          <li>
            <Link
              href={APP_ROUTES.admin.tournaments}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 font-semibold transition ${
                pathname === APP_ROUTES.admin.tournaments
                  ? 'bg-primary text-black'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setIsOpen(false)}
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

export default NavMobile
