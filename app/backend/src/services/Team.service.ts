import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async listTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.list();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findTeam(id: number): Promise<ServiceResponse<ITeam | null>> {
    const foundedTeam = await this.teamModel.find(id);

    return { status: 'SUCCESSFUL', data: foundedTeam };
  }
}
