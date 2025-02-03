import { Player } from "@/types/player";
import {
  PrismaClient,
  Gender,
  Level,
  TournamentType,
  TournamentStatus,
} from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const levels: Level[] = [
  Level.Five,
  Level.Four,
  Level.Three,
  Level.Two,
  Level.One,
];
const playerNames = [
  "Juan Lebrón",
  "Alejandro Galán",
  "Paquito Navarro",
  "Martín Di Nenno",
  "Agustín Tapia",
  "Federico Chingotto",
  "Arturo Coello",
  "Fernando Belasteguín",
  "Sanyo Gutiérrez",
  "Pablo Lima",
  "Gemma Triay",
  "Alejandra Salazar",
  "Paula Josemaría",
  "Ariana Sánchez",
  "Beatriz González",
  "Marta Ortega",
  "Lucía Sainz",
  "Marta Marrero",
  "Javier Garrido",
  "Miguel Lamperti",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function createTournamentCouples(players: Player[], count: number) {
  const couples = [];
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

  for (let i = 0; i < count && i * 2 + 1 < shuffledPlayers.length; i++) {
    const player1 = shuffledPlayers[i * 2];
    const player2 = shuffledPlayers[i * 2 + 1];
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
  for (let i = 0; i < playerNames.length; i++) {
    const player = await prisma.player.create({
      data: {
        name: playerNames[i],
        email: `${playerNames[i].toLowerCase().replace(" ", ".")}@example.com`,
        age: Math.floor(Math.random() * 20) + 25, // Ages between 25 and 44
        phone: `+1${Math.floor(Math.random() * 10000000000)
          .toString()
          .padStart(10, "0")}`,
        gender: i < 10 ? Gender.Male : Gender.Female,
        level: getRandomElement(levels),
      },
    });
    players.push(player);
  }

  // Create 1 league
  const league = await prisma.league.create({
    data: {
      name: "Liga 2025",
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
  const tournament1Couples = await createTournamentCouples(players, 4);
  const tournament2Couples = await createTournamentCouples(players, 6);
  const tournament3Couples = await createTournamentCouples(players, 8);
  const tournament4Couples = await createTournamentCouples(players, 10);
  const tournament5Couples = await createTournamentCouples(players, 4);
  const tournament6Couples = await createTournamentCouples(players, 6);

  await createTournament("Torneo 1 Court", 1, tournament1Couples);
  await createTournament("Torneo 3 Courts", 3, tournament2Couples);
  await createTournament("Torneo 4 Courts", 4, tournament3Couples);
  await createTournament("Torneo 5 Courts", 5, tournament4Couples);
  await createTournament("Torneo 1 Court", 3, tournament5Couples);
  await createTournament("Torneo 3 Courts", 3, tournament6Couples);

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
