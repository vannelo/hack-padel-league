"use client";

import { useState, useEffect } from "react";
import { getAllPlayers } from "@/app/actions/playerActions";
import PlayerTable from "@/components/Player/PlayerTable/PlayerTable";
import PlayerCreationModal from "@/components/Player/PlayerCreationModal/PlayerCreationModal";
import { Button } from "@mui/material";

export default function AdminPlayers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line
  const [players, setPlayers] = useState<any[]>([]);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const fetchPlayers = async () => {
    const fetchedPlayers = await getAllPlayers();
    setPlayers(fetchedPlayers);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleOpenModal = () => {
    setEditingPlayerId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlayerId(null);
  };

  const handlePlayerCreated = () => {
    fetchPlayers();
    handleCloseModal();
  };

  const handlePlayerDeleted = () => {
    fetchPlayers();
  };

  const handlePlayerEdit = (playerId: string) => {
    setEditingPlayerId(playerId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Jugadores</h1>
      <section className="mb-8">
        <PlayerTable
          players={players}
          onPlayerDeleted={handlePlayerDeleted}
          onPlayerEdit={handlePlayerEdit}
        />
      </section>
      <section className="mb-8">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Crear Jugador
        </Button>
        <PlayerCreationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onPlayerCreated={handlePlayerCreated}
          editingPlayerId={editingPlayerId}
        />
      </section>
    </div>
  );
}
