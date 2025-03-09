import type { Gender, Level, Player as PrismaPlayer } from '@prisma/client';

export type Player = PrismaPlayer;

export interface CreatePlayerData {
  name: string;
  email?: string;
  age?: number;
  phone?: string;
  gender: Gender;
  level: Level;
}
