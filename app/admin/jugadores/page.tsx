'use client'

import { useCallback, useEffect, useState } from 'react'

import { getAllPlayers } from '@/app/actions/playerActions'
import AdminTablePageLayout from '@/components/Admin/Layout/AdminTablePageLayout/AdminTablePageLayout'
import PlayerCreate from '@/components/Admin/Player/PlayerCreate/PlayerCreate'
import PlayerEdit from '@/components/Admin/Player/PlayerEdit/PlayerEdit'
import PlayerTable from '@/components/Admin/Player/PlayerTable/PlayerTable'
import Modal from '@/components/Admin/UI/Modal/Modal'
import TableLoader from '@/components/Admin/UI/TableLoader/TableLoader'
import Button from '@/components/UI/Button/Button'
import { TEXT } from '@/constants/text'
import { useSnackbar } from '@/hooks/useSnackBar'
import type { Player } from '@/types/player'

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
    <AdminTablePageLayout
      title={TEXT.admin.players.playersTitle}
      ctaButton={
        <Button
          label={TEXT.admin.players.createPlayer}
          onClick={() => openModal()}
          variant="primary"
          size="medium"
        />
      }
      table={
        isLoading ? (
          <TableLoader />
        ) : (
          <PlayerTable players={players} onPlayerEdit={openModal} />
        )
      }
      modal={
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
            <PlayerCreate
              onPlayerCreated={(name) =>
                handlePlayerAction(TEXT.admin.players.playerCreated(name))
              }
            />
          )}
        </Modal>
      }
    />
  )
}
