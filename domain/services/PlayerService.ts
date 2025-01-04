import { PlayerRepository } from "@/domain/repositories/PlayerRepository";

export class PlayerService {
  private playerRepository = new PlayerRepository();

  // eslint-disable-next-line
  async createPlayer(playerData: any): Promise<any> {
    return this.playerRepository.createPlayer(playerData);
  }

  // eslint-disable-next-line
  async updatePlayer(id: string, playerData: any): Promise<any> {
    return this.playerRepository.updatePlayer(id, playerData);
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerRepository.deletePlayer(id);
  }

  // eslint-disable-next-line
  async getPlayerById(id: string): Promise<any> {
    return this.playerRepository.getPlayerById(id);
  }

  // eslint-disable-next-line
  async getAllPlayers(): Promise<any[]> {
    return this.playerRepository.getAllPlayers();
  }
}
