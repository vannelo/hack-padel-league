'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { APP_ROUTES } from '@/constants/appRoutes'
import { adminMenuItems } from '@/constants/menuItems'

import NavSidebarItem from './NavSidebarItem'

const NavSidebar = () => {
  return (
    <nav className="left-0 top-0 z-10 hidden h-screen w-64 flex-col bg-white p-4 transition-all duration-300 md:fixed md:flex">
      <div className="h-screen rounded-lg border border-gray-200 px-4 py-8">
        <div className="mb-6 text-center">
          <Link href={APP_ROUTES.admin.players}>
            <Image
              src="/img/hack-logo-black.png"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto mb-2"
            />
          </Link>
        </div>
        <ul className="block space-y-4">
          {adminMenuItems.map((item) => (
            <NavSidebarItem key={item.href} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavSidebar
