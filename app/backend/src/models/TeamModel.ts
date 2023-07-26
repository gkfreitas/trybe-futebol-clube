import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async list(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();

    return allTeams;
  }

  async find(id: number): Promise<ITeam | null> {
    const foundedTeam = await this.model.findByPk(id);
    if (foundedTeam === null) return null;
    return foundedTeam;
  }
}
