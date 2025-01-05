import { PrismaClient, Gender, Level } from "@prisma/client";
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
      level: "Cuarta",
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
        points: Math.floor(Math.random() * 100),
      },
    });
  }

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
