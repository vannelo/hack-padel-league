'use client'

import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

import { pusherClient } from '@/lib/pusher'

export function TournamentLiveUpdater({
  tournamentId,
  children,
}: {
  tournamentId: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const channel = pusherClient.subscribe(`tournament-${tournamentId}`)
    channel.bind('score-updated', () => {
      setIsUpdating(true)
      router.refresh()

      setTimeout(() => {
        setIsUpdating(false)
      }, 1000)
    })

    return () => {
      channel.unbind('score-updated')
      pusherClient.unsubscribe(`tournament-${tournamentId}`)
    }
  }, [tournamentId, router])

  return (
    <>
      {isUpdating && (
        <div className="fixed left-0 right-0 top-0 z-50 bg-primary py-1 text-center text-white">
          Actualizando resultados...
        </div>
      )}
      {children}
    </>
  )
}
