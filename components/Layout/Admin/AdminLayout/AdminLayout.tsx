'use client'

import NavSidebar from '@/components/Layout/Admin/NavSidebar/NavSidebar'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/lib/theme'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-[100vh]">
        <NavSidebar />
        <div className="ml-64 px-8 py-2">{children}</div>
      </div>
    </ThemeProvider>
  )
}
