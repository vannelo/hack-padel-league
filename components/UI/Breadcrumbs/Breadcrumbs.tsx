'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const breadcrumbMap: { [key: string]: string } = {
  admin: 'Admin',
  jugadores: 'Jugadores',
  ligas: 'Ligas',
  torneos: 'Torneos',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center text-sm">
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          const label = breadcrumbMap[segment] || segment

          return (
            <li key={path} className="flex items-center">
              {isLast ? (
                <div className="text-[12px]">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="font-bold">{label}</span>
                </div>
              ) : (
                <Link href={path} className="text-[12px]">
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
