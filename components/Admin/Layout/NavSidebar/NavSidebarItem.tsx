'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { startsWithRoute } from '@/lib/helpers'

interface NavSidebarItemProps {
  item: {
    text: string
    href: string
    icon?: React.ElementType
  }
}

const NavSidebarItem = ({ item }: NavSidebarItemProps) => {
  const pathname = usePathname()

  return (
    <li key={item.text}>
      <Link
        href={item.href}
        className={`flex items-center space-x-3 rounded p-2 font-bold transition ${
          startsWithRoute(pathname, item.href)
            ? 'bg-primary'
            : 'hover:text-slate-400'
        }`}
      >
        {item.icon && React.createElement(item.icon, { size: 20 })}
        <span>{item.text}</span>
      </Link>
    </li>
  )
}

export default NavSidebarItem
