import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async listTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.listTeams();
    res.status(200).json(ServiceResponse.data);
  }

  public async findTeam(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.teamService.findTeam(+id);
    res.status(200).json(ServiceResponse.data);
  }
}
