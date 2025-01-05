import { LeagueRepository } from "@/domain/repositories/LeagueRepository";

export class LeagueService {
  private leagueRepository = new LeagueRepository();

  // eslint-disable-next-line
  async createLeague(data: any) {
    return this.leagueRepository.createLeague(data);
  }

  async deleteLeague(id: string) {
    await this.leagueRepository.deleteLeague(id);
  }

  async getAllLeagues() {
    return this.leagueRepository.getAllLeagues();
  }

  // eslint-disable-next-line
  async addPlayerToLeague(data: any) {
    return this.leagueRepository.addPlayerToLeague(data);
  }
}
