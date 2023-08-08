import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel, bodyCreate, bodyUpdate } from '../Interfaces/IMatchModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;
  private teamModel = SequelizeTeamModel;

  async list(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll();
    const allTeams = await this.teamModel.findAll();
    const newList = allMatches.map((e) => {
      const { dataValues: homeTeamId, awayTeamId } = e;
      const homeTeamName = allTeams.find((el) => el.dataValues.id === +homeTeamId.homeTeamId);
      const awayTeamName = allTeams.find((el) => el.dataValues.id === +awayTeamId);
      const newArray = { ...e.dataValues,
        homeTeam: { teamName: homeTeamName?.dataValues.teamName },
        awayTeam: { teamName: awayTeamName?.dataValues.teamName } };
      return newArray;
    });
    return newList;
  }

  async listFilter(inProgress: boolean): Promise<IMatch[]> {
    const allMatchesFiltered = await this.model.findAll({ where: { inProgress } });
    const allTeams = await this.teamModel.findAll();
    const newList = allMatchesFiltered.map((e) => {
      const homeTeamName = allTeams.find((el) => el.dataValues.id === e.dataValues.homeTeamId);
      const awayTeamName = allTeams.find((el) => el.dataValues.id === e.dataValues.awayTeamId);
      const newArray = { ...e.dataValues,
        homeTeam: { teamName: homeTeamName?.dataValues.teamName },
        awayTeam: { teamName: awayTeamName?.dataValues.teamName } };
      return newArray;
    });
    return newList;
  }

  async updateMatch(id: number): Promise<IMatch | number[] | null> {
    const updatedMatch = await this.model.update({ inProgress: false }, { where: { id } });
    return updatedMatch;
  }

  async updateInProgress(body: bodyUpdate, id: number): Promise<IMatch | null> {
    await this.model.update(body, { where: { id } });
    const updatedMatch = this.model.findByPk(id);
    return updatedMatch;
  }

  async create(body: bodyCreate): Promise<IMatch> {
    const newMatch = await this.model.create({ ...body, inProgress: true });
    return newMatch;
  }
}
