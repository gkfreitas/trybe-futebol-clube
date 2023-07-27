import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel, bodyCreate, bodyUpdate } from '../Interfaces/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async listMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.list();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async listMatchesFiltered(inProgress: boolean): Promise<ServiceResponse<IMatch[] | null>> {
    const allMatches = await this.matchModel.listFilter(inProgress);

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatch(id: number): Promise<ServiceResponse<IMatch | number[] | null>> {
    const updatedMatch = await this.matchModel.updateMatch(id);
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async updateInProgress(body: bodyUpdate, id: number):
  Promise<ServiceResponse<IMatch | null>> {
    const updatedMatch = await this.matchModel.updateInProgress(body, id);
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async create(body: bodyCreate): Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.create(body);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
