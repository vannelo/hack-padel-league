import { getAllPlayers } from "@/app/actions/playerActions";
import { getTournamentById } from "@/app/actions/tournamentActions";
import TournamentContent from "@/components/Tournament/TournamentContent/TournamentContent";
import { Container } from "@mui/material";
import { notFound } from "next/navigation";

export default async function TournamentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await getTournamentById(params.id);
  const players = await getAllPlayers();

  if (!tournament) {
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <TournamentContent initialTournament={tournament} players={players} />
    </Container>
  );
}
