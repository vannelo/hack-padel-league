"use client";

import { useState, useEffect } from "react";
import { getAllPlayers } from "@/app/actions/playerActions";
import PlayerTable from "@/components/Player/PlayerTable/PlayerTable";
import PlayerModal from "@/components/Player/PlayerModal/PlayerModal";
import { Button, CircularProgress } from "@mui/material";
import type { Player } from "@/types/player";

export default function AdminPlayers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const fetchedPlayers = await getAllPlayers();
      setPlayers(fetchedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
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
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Crear Jugador
        </Button>
      </section>
      <section className="mb-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <PlayerTable
            players={players}
            onPlayerDeleted={handlePlayerDeleted}
            onPlayerEdit={handlePlayerEdit}
          />
        )}
      </section>
      <section className="mb-8">
        <PlayerModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onPlayerCreated={handlePlayerCreated}
          editingPlayerId={editingPlayerId}
        />
      </section>
    </div>
  );
}
