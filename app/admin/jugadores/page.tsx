'use client'

import { useState, useEffect } from 'react'
import { getAllPlayers } from '@/app/actions/playerActions'
import PlayerTable from '@/components/Player/PlayerTable/PlayerTable'
import PlayerModal from '@/components/Player/PlayerModal/PlayerModal'
import { CircularProgress } from '@mui/material'
import type { Player } from '@/types/player'
import Button from '@/components/UI/Button/Button'
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs'

export default function AdminPlayers() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPlayers = async () => {
    setIsLoading(true)
    try {
      const fetchedPlayers = await getAllPlayers()
      setPlayers(fetchedPlayers)
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleOpenModal = () => {
    setEditingPlayerId(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPlayerId(null)
  }

  const handlePlayerCreated = () => {
    fetchPlayers()
    handleCloseModal()
  }

  const handlePlayerDeleted = () => {
    fetchPlayers()
  }

  const handlePlayerEdit = (playerId: string) => {
    setEditingPlayerId(playerId)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto py-16">
      <Breadcrumbs />
      <h1 className="my-0 mb-4 text-2xl font-bold text-gray-800">Jugadores</h1>
      <section className="mb-8">
        <Button
          label="Crear Jugador"
          onClick={handleOpenModal}
          variant="primary"
          size="medium"
        />
      </section>
      <section className="mb-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
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
  )
}
