'use client'

import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

import { getAllTournaments } from '@/app/actions/tournamentActions'
import TournamentModal from '@/components/Tournament/TournamentModal/TournamentModal'
import TournamentTable from '@/components/Tournament/TournamentTable/TournamentTable'
import Breadcrumbs from '@/components/UI/Breadcrumbs/Breadcrumbs'
import Button, {
  ButtonSize,
  ButtonVariant,
} from '@/components/UI/Button/Button'
import { Tournament } from '@/types/tournament'

export default function AdminTournaments() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTournaments = async () => {
    setIsLoading(true)
    try {
      const fetchedTournaments = await getAllTournaments()
      setTournaments(fetchedTournaments as Tournament[])
    } catch (error) {
      console.error('Error fetching players and tournaments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTournaments()
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleTournamentCreated = () => {
    fetchTournaments()
    handleCloseModal()
  }

  return (
    <div className="container mx-auto py-16">
      <Breadcrumbs />
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Torneos</h1>
      <section className="mb-8">
        <Button
          label="Crear Torneo"
          onClick={handleOpenModal}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
        />
      </section>
      <section className="mb-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
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
  )
}
