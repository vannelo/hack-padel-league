import { Award, Trophy, Users } from 'lucide-react'
import { appRoutes } from './appRoutes'

export const adminMenuItems = [
  {
    href: appRoutes.admin.players,
    icon: Users,
    text: 'Jugadores',
  },
  {
    href: appRoutes.admin.leagues,
    icon: Award,
    text: 'Ligas',
  },
  {
    href: appRoutes.admin.tournaments,
    icon: Trophy,
    text: 'Torneos',
  },
]
