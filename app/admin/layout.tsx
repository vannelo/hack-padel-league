import PageLayout from '@/components/Admin/Layout/PageLayout/PageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Hack Padel',
  description: 'Administra los torneos, jugadores y ligas en Hack Padel.',
  openGraph: {
    title: 'Admin | Hack Padel',
    description: 'Administra los torneos, jugadores y ligas en Hack Padel.',
    type: 'website',
    images: [
      {
        url: '/img/meta.jpg',
        width: 1500,
        height: 800,
        alt: 'Hack Padel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hackpadel',
    title: 'Hack Padel',
    description: 'Primera cancha de padel en Lindavista',
    images: ['/img/meta.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>
}
