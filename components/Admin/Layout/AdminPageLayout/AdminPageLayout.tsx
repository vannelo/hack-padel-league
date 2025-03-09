'use client';

import { ThemeProvider } from '@mui/material/styles';

import NavMobile from '@/components/Admin/Layout/NavMobile/NavMobile';
import NavSidebar from '@/components/Admin/Layout/NavSidebar/NavSidebar';
import theme from '@/lib/theme';

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <NavMobile />
      <div className="min-h-[100vh]">
        <NavSidebar />
        <div className="px-8 py-8 md:ml-64 md:py-2">{children}</div>
      </div>
    </ThemeProvider>
  );
}
