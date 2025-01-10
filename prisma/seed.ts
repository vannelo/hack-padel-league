import {
  PrismaClient,
  Gender,
  Level,
  TournamentType,
  TournamentStatus,
} from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const genders: Gender[] = [Gender.Male, Gender.Female];
const levels: Level[] = [
  Level.Five,
  Level.Four,
  Level.Three,
  Level.Two,
  Level.One,
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// eslint-disable-next-line
async function createTournamentCouples(players: any[], count: number) {
  const couples = [];
  for (let i = 0; i < count; i++) {
    const player1 = players[i * 2];
    const player2 = players[i * 2 + 1];
    const couple = await prisma.tournamentCouple.create({
      data: {
        id: randomUUID(),
        player1Id: player1.id,
        player2Id: player2.id,
      },
    });
    couples.push(couple);
  }
  return couples;
}

async function createTournament(
  name: string,
  availableCourts: number,
  // eslint-disable-next-line
  couples: any[]
) {
  const tournament = await prisma.tournament.create({
    data: {
      name,
      type: TournamentType.Casual,
      status: TournamentStatus.Upcoming,
      availableCourts,
      startDate: new Date("2025-01-01"),
      endDate: null,
      couples: {
        connect: couples.map((couple) => ({ id: couple.id })),
      },
    },
  });
  return tournament;
}

async function main() {
  // Create 20 players
  const players = [];
  for (let i = 0; i < 20; i++) {
    const player = await prisma.player.create({
      data: {
        name: `Jugador ${i + 1}`,
        email: `jugador${i + 1}@example.com`,
        age: Math.floor(Math.random() * 30) + 18,
        phone: `+1${Math.floor(Math.random() * 10000000000)
          .toString()
          .padStart(10, "0")}`,
        gender: getRandomElement(genders),
        level: getRandomElement(levels),
      },
    });
    players.push(player);
  }

  // Create 1 league
  const league = await prisma.league.create({
    data: {
      name: "Liga 2023",
      level: Level.Four,
      status: "Upcoming",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-08-31"),
    },
  });

  // Associate players with the league
  for (const player of players) {
    await prisma.leaguePlayer.create({
      data: {
        id: randomUUID(),
        leagueId: league.id,
        playerId: player.id,
        points: 0,
      },
    });
  }

  // Create tournaments
  const tournament1Couples = await createTournamentCouples(
    players.slice(0, 8),
    4
  ); // 4 couples (8 players)
  const tournament2Couples = await createTournamentCouples(
    players.slice(8, 20),
    6
  ); // 6 couples (12 players)
  const tournament3Couples = await createTournamentCouples(
    players.slice(0, 16),
    8
  ); // 8 couples (16 players)

  await createTournament("Torneo 1 Court", 1, tournament1Couples); // 1 court
  await createTournament("Torneo 3 Courts", 3, tournament2Couples); // 3 courts
  await createTournament("Torneo 4 Courts", 4, tournament3Couples); // 4 courts

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
