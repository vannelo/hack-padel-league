'use client'

import { useCallback, useEffect, useState } from 'react'

import { getAllLeagues } from '@/app/actions/leagueActions'
import AdminTablePageLayout from '@/components/Admin/Layout/AdminTablePageLayout/AdminTablePageLayout'
import LeagueCreation from '@/components/Admin/League/LeagueCreate/LeagueCreate'
import Modal from '@/components/Admin/UI/Modal/Modal'
import TableLoader from '@/components/Admin/UI/TableLoader/TableLoader'
import LeagueTable from '@/components/League/LeagueTable/LeagueTable'
import Button from '@/components/UI/Button/Button'
import { TEXT } from '@/constants/text'
import { useSnackbar } from '@/hooks/useSnackBar'
import { League } from '@/types/league'

export default function AdminLeagues() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leagues, setLeagues] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showSnackbar } = useSnackbar()

  const fetchLeagues = useCallback(async () => {
    setIsLoading(true)
    try {
      const fetchedLeagues = await getAllLeagues()
      setLeagues(fetchedLeagues as League[])
    } catch {
      showSnackbar(TEXT.admin.leagues.errorFetching, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [showSnackbar])

  useEffect(() => {
    fetchLeagues()
  }, [fetchLeagues])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const handleLeagueAction = (name: string) => {
    fetchLeagues()
    showSnackbar(TEXT.admin.leagues.leagueCreated(name), 'success')
    setIsModalOpen(false)
  }

  return (
    <AdminTablePageLayout
      title={TEXT.admin.leagues.leaguesTitle}
      ctaButton={
        <Button
          label={TEXT.admin.leagues.createLeague}
          onClick={openModal}
          variant="primary"
          size="medium"
        />
      }
      table={isLoading ? <TableLoader /> : <LeagueTable leagues={leagues} />}
      modal={
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={TEXT.admin.leagues.createLeague}
        >
          <LeagueCreation onLeagueCreated={handleLeagueAction} />
        </Modal>
      }
    />
  )
}
