import { getLeagueById } from "@/app/actions/leagueActions";
import { getAllPlayers } from "@/app/actions/playerActions";
import LeagueContent from "@/components/League/LeagueContent/LeagueContent";
import { League } from "@/types/league";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";

export default async function LeagueDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const league = await getLeagueById(params.id);
  const players = await getAllPlayers();

  if (!league) {
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <LeagueContent initialLeague={league as League} players={players} />
    </Container>
  );
}
