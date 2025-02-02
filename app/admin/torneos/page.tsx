"use client";

import { getAllTournaments } from "@/app/actions/tournamentActions";
import TournamentModal from "@/components/Tournament/TournamentModal/TournamentModal";
import TournamentTable from "@/components/Tournament/TournamentTable/TournamentTable";
import { Tournament } from "@/types/tournament";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminTournaments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTournaments = async () => {
    setIsLoading(true);
    try {
      const fetchedTournaments = await getAllTournaments();
      setTournaments(fetchedTournaments as Tournament[]);
    } catch (error) {
      console.error("Error fetching players and tournaments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTournamentCreated = () => {
    fetchTournaments();
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Torneos</h1>
      <section className="mb-8">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Crear torneo
        </Button>
      </section>
      <section className="mb-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <TournamentTable tournaments={tournaments} />
        )}
      </section>
      <section className="mb-8">
        <TournamentModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onTournamentCreated={handleTournamentCreated}
        />
      </section>
    </div>
  );
}
