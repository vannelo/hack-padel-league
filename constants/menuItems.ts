import { Award, Trophy, Users } from 'lucide-react';

import { APP_ROUTES } from './appRoutes';

export const adminMenuItems = [
  {
    href: APP_ROUTES.admin.players,
    icon: Users,
    text: 'Jugadores',
  },
  {
    href: APP_ROUTES.admin.leagues,
    icon: Award,
    text: 'Ligas',
  },
  {
    href: APP_ROUTES.admin.tournaments,
    icon: Trophy,
    text: 'Torneos',
  },
];
