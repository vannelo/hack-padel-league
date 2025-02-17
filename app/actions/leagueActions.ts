'use server'

import { revalidatePath } from 'next/cache'

import { appRoutes } from '@/constants/appRoutes'
import { leagueService } from '@/domain'
import { CreateLeagueData } from '@/types/league'

export async function createLeague(data: CreateLeagueData) {
  await leagueService.createLeague(data)
}

export async function deleteLeague(id: string) {
  await leagueService.deleteLeague(id)
  revalidatePath(appRoutes.leagues.index)
}

// eslint-disable-next-line
export async function addPlayerToLeague(data: any) {
  await leagueService.addPlayerToLeague(data)
  revalidatePath(appRoutes.leagues.index)
}

export async function getAllLeagues() {
  return leagueService.getAllLeagues()
}

export async function getLeagueById(id: string) {
  return leagueService.getLeagueById(id)
}

export async function startLeague(leagueId: string) {
  return leagueService.startLeague(leagueId)
}

export async function finishLeague(leagueId: string) {
  return leagueService.finishLeague(leagueId)
}
