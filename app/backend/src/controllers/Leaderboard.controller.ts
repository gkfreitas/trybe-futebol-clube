import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async listLeaderBoard(_req: Request, res: Response) {
    const ServiceResponse = await this.leaderboardService.listLeaderboard();
    res.status(200).json(ServiceResponse.data);
  }
}
