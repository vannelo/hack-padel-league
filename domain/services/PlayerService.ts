import { PlayerRepository } from '@/domain/repositories/PlayerRepository'
import { CreatePlayerData, Player } from '@/types/player'

export class PlayerService {
  private playerRepository = new PlayerRepository()

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.getAllPlayers()
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return this.playerRepository.getPlayerById(id)
  }

  async createPlayer(playerData: CreatePlayerData): Promise<Player> {
    return this.playerRepository.createPlayer(playerData)
  }

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player> {
    return this.playerRepository.updatePlayer(id, playerData)
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerRepository.deletePlayer(id)
  }
}
