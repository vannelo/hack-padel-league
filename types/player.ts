import type { Player as PrismaPlayer } from "@prisma/client";

export type Player = PrismaPlayer;

export interface ExtendedPlayer extends Player {
  // Add your custom fields here
  test: string;
}
