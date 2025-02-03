"use client";

import { getAllLeagues } from "@/app/actions/leagueActions";
import LeagueModal from "@/components/League/LeagueModal/LeagueModal";
import LeagueTable from "@/components/League/LeagueTable/LeagueTable";
import { League } from "@/types/league";
import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminLeagues() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeagues = async () => {
    setIsLoading(true);
    try {
      const fetchedLeagues = await getAllLeagues();
      setLeagues(fetchedLeagues as League[]);
    } catch {
      console.error("Error fetching leagues");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLeagueCreated = () => {
    fetchLeagues();
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ligas</h1>
      <section className="mb-8">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Crear liga
        </Button>
      </section>
      <section className="mb-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <LeagueTable leagues={leagues} />
        )}
      </section>
      <section className="mb-8">
        <LeagueModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onLeagueCreated={handleLeagueCreated}
        />
      </section>
    </div>
  );
}
