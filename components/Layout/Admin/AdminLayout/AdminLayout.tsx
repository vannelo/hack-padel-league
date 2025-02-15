'use client'

import NavSidebar from '@/components/Layout/Admin/NavSidebar/NavSidebar'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/lib/theme'
import NavMobile from '@/components/Layout/Admin/NavMobile/NavMobile'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <NavMobile />
      <div className="min-h-[100vh]">
        <NavSidebar />
        <div className="px-8 py-8 md:ml-64 md:py-2">{children}</div>
      </div>
    </ThemeProvider>
  )
}
