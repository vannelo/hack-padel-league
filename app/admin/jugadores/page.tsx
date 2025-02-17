'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllPlayers } from '@/app/actions/playerActions'
import PlayerTable from '@/components/Player/PlayerTable/PlayerTable'
import { CircularProgress } from '@mui/material'
import type { Player } from '@/types/player'
import Button from '@/components/UI/Button/Button'
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs'
import Modal from '@/components/Admin/UI/Modal/Modal'
import PlayerCreation from '@/components/Admin/Player/PlayerCreate/PlayerCreate'
import PlayerEdit from '@/components/Admin/Player/PlayerEdit/PlayerEdit'
import { useSnackbar } from '@/hooks/useSnackBar'
import { TEXT } from '@/constants/text'

export default function AdminPlayers() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showSnackbar } = useSnackbar()

  const fetchPlayers = useCallback(async () => {
    setIsLoading(true)
    try {
      const fetchedPlayers = await getAllPlayers()
      setPlayers(fetchedPlayers)
    } catch {
      showSnackbar(TEXT.admin.players.errorFetching, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [showSnackbar])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const openModal = (playerId: string | null = null) => {
    setEditingPlayerId(playerId)
    setIsModalOpen(true)
  }

  const handlePlayerAction = (message: string) => {
    fetchPlayers()
    showSnackbar(message, 'success')
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto py-16">
      <Breadcrumbs />
      <h1 className="my-0 mb-4 text-2xl font-bold text-gray-800">
        {TEXT.admin.players.playersTitle}
      </h1>
      <section className="mb-8">
        <Button
          label={TEXT.admin.players.createPlayer}
          onClick={() => openModal()}
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
          <PlayerTable players={players} onPlayerEdit={openModal} />
        )}
      </section>
      <section className="mb-8">
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            editingPlayerId
              ? TEXT.admin.players.editPlayer
              : TEXT.admin.players.createPlayer
          }
        >
          {editingPlayerId ? (
            <PlayerEdit
              playerId={editingPlayerId}
              onPlayerUpdated={() =>
                handlePlayerAction(TEXT.admin.players.playerUpdated)
              }
              onPlayerDeleted={() =>
                handlePlayerAction(TEXT.admin.players.playerDeleted)
              }
            />
          ) : (
            <PlayerCreation
              onPlayerCreated={() =>
                handlePlayerAction(TEXT.admin.players.playerCreated)
              }
            />
          )}
        </Modal>
      </section>
    </div>
  )
}
